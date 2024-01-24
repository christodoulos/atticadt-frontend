import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  CustomLayerInterface,
  LngLat,
  Map,
  NavigationControl,
  ScaleControl,
} from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import saveAs from 'file-saver';
import { environment } from 'src/environments/environment';

declare global {
  interface Window {
    tb: any;
  }
}

window.tb = window.tb || {};

export type AnchorType =
  | 'auto'
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type ThreeDType = { x: number; y: number; z: number };

export interface GLBModel {
  id: string;
  where: LngLat;
  elevation: number;
  anchor: AnchorType;
  glb: string;
  scale: ThreeDType;
  rotation: ThreeDType;
  castShadow: boolean;
  tooltip: string;
}

export interface MapLocation {
  name: string;
  center: { lng: number; lat: number };
  zoom: number;
  bearing: number;
  pitch: number;
  glbModels?: GLBModel[];
}

@Injectable({ providedIn: 'root' })
export class MapService {
  map: Map | undefined;

  tb = window.tb;

  http = inject(HttpClient);

  exaggeration = 1;

  initializeMap() {
    this.map = new Map({
      container: 'map',
      style: 'mapbox://styles/christodoulos/clqjoryfl00o301qvhaat7oj4',
      antialias: true,
      attributionControl: false,
      preserveDrawingBuffer: true,
      bearingSnap: 0,
      pitch: 0,
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    });

    // Add zoom and rotation controls to the map.
    this.map.addControl(new NavigationControl());
    this.map.addControl(new ScaleControl());
    // this.map.scrollZoom.disable();

    console.log('MapService.initializeMap Mapbox initialized');

    window.tb = this.tb = new Threebox(
      this.map,
      this.map.getCanvas().getContext('webgl'),
      {
        willReadFrequently: true,
        sky: true,
        terrain: true,
        defaultLights: true,
        realSunlight: true,
        enableSelectingObjects: true,
        enableDraggingObjects: true,
        enableHelpTooltips: true,
      }
    );

    console.log('MapService.initializeMap Threebox initialized');
  }

  glbLayer(
    id: string,
    where: LngLat,
    elevation: number,
    modelFile: string,
    scale: ThreeDType,
    rotation: ThreeDType,
    anchor: AnchorType = 'bottom-left',
    modelCastShadow: boolean,
    modelToolTip: string = ''
  ): Promise<CustomLayerInterface> {
    return new Promise((resolve, reject) => {
      if (!this.tb || !this.map) {
        reject('Threebox and/or Mapbox is not initialized');
        return;
      }

      const options = {
        obj: modelFile,
        type: 'gltf',
        scale,
        units: 'meters',
        rotation,
        anchor,
      };

      this.tb.loadObj(options, async (model: any) => {
        const terrainElevation = await this.getTerrainElevation(
          where.lng,
          where.lat
        );
        console.log(
          `Map elevation at (${where.lng} ${where.lat}) is ${terrainElevation} meters`
        );

        const pos = [where.lng, where.lat, elevation + terrainElevation];
        model.setCoords(pos);

        if (modelToolTip) model.addTooltip(modelToolTip, true);
        model.modelCastShadow = modelCastShadow;
        this.tb.lights.dirLight.target = model;

        const customLayer: CustomLayerInterface = {
          id: `glb-model-${id}`,
          type: 'custom',
          renderingMode: '3d',
          onAdd: () => {
            this.tb.add(model);
          },
          render: () => {
            this.tb.update();
          },
        };
        resolve(customLayer);
      });
    });
  }

  async addGLBModels(models: GLBModel[]) {
    console.log('addGLBModels', models);
    const promises: CustomLayerInterface[] = [];
    for (const model of models) {
      promises.push(
        await this.glbLayer(
          model.id,
          model.where,
          model.elevation,
          `/assets/glbs/${model.glb}.glb`,
          model.scale,
          model.rotation,
          model.anchor,
          model.castShadow,
          model.tooltip
        )
      );
    }
    return Promise.all(promises);
  }

  flyTo(location: MapLocation): Promise<MapLocation> {
    return new Promise((resolve, reject) => {
      if (!this.map) {
        reject('Map is not initialized');
        return;
      }

      this.map.flyTo({ ...location });
      this.map.once('moveend', () => {
        resolve(location);
      });
    });
  }

  getLocation(name: string) {
    return this.http.get<MapLocation>(
      `${environment.apiUrl}/atticadt/locations/${name}`
    );
  }

  setLocation(name: string) {
    this.getLocation(name).subscribe((location) => {
      this.flyTo(location).then((location) => {
        if (location.glbModels) {
          this.addGLBModels(location.glbModels).then((layers) => {
            for (const layer of layers) {
              this.map?.addLayer(layer);
            }
          });
        }
      });
    });
  }

  leaveLocation(name: string) {
    this.getLocation(name).subscribe((location) => {
      if (location.glbModels) {
        for (const model of location.glbModels) {
          this.map?.removeLayer(`glb-model-${model.id}`);
        }
        this.tb.clear();
      }
    });
  }

  getTerrainElevation(lng: number, lat: number): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.map) {
        reject('Map is not initialized');
        return;
      }

      const coordinates: mapboxgl.LngLatLike = [lng, lat];

      if (!this.map.isMoving() && !this.map.isZooming()) {
        const elevation =
          this.map!.queryTerrainElevation(coordinates, { exaggerated: true }) ??
          0;
        resolve(elevation);
      } else {
        this.map.once('moveend', () => {
          const elevation =
            this.map!.queryTerrainElevation(coordinates, {
              exaggerated: true,
            }) ?? 0;
          resolve(elevation);
        });
      }
    });
  }

  zeroExaggeration() {
    this.map?.setTerrain({
      source: 'mapbox-dem',
      exaggeration: 0,
    });
  }

  restoreExaggeration() {
    this.map?.setTerrain({
      source: 'mapbox-dem',
      exaggeration: this.exaggeration,
    });
  }

  downloadMap() {
    // Τhanks to https://tinyurl.com/22vht9zc accepted answer
    const img = new Image();
    const mapCanvas = document.querySelector(
      '.mapboxgl-canvas'
    ) as HTMLCanvasElement;
    if (mapCanvas) {
      img.src = mapCanvas.toDataURL();
      saveAs(img.src, 'map.png');
    }
  }
}
