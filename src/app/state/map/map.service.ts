import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomLayerInterface, LngLat, Map } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';

import {
  AppState,
  MapLocation,
  AnchorType,
  ThreeDType,
  GLBModel,
} from '@atticadt/state';

declare global {
  interface Window {
    tb: any;
  }
}

window.tb = window.tb || {};

@Injectable({ providedIn: 'root' })
export class MapService {
  map: Map | undefined;
  tb = window.tb;

  http = inject(HttpClient);
  store = inject(Store<AppState>);

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

    window.tb = this.tb = new Threebox(
      this.map,
      this.map.getCanvas().getContext('webgl'),
      {
        willReadFrequently: true,
        // realSunlight: true,
        sky: true,
        terrain: true,
        enableSelectingObjects: true,
        enableSelectingFeatures: true,
        enableDraggingObjects: true,
        enableRotatingObjects: true,
        defaultLights: true,
      }
    );
  }

  async glbLayer(
    id: string,
    where: LngLat,
    elevation: number,
    modelFile: string,
    scale: ThreeDType = { x: 1, y: 1, z: 1 },
    rotation: ThreeDType = { x: 0, y: 0, z: 0 },
    anchor: AnchorType = 'bottom-left',
    modelCastShadow: boolean = false,
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
        // const terrainElevation =
        //   this.map?.queryTerrainElevation([where.lng, where.lat], {
        //     exaggerated: false,
        //   }) ?? 0;
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

  getLocation(name: string) {
    return this.http.get<MapLocation>(
      `http://localhost:3456/api/atticadt/location/${name}`
    );
  }

  getBounds() {
    return this.map?.getBounds().toArray();
  }

  getLayers() {
    const layers = this.map?.getStyle().layers;
    for (const layer of layers ?? []) {
      console.log(layer);
    }
  }

  async flyTo(location: MapLocation): Promise<number[][]> {
    return new Promise((resolve, reject) => {
      if (!this.map) {
        reject('Map is not initialized');
        return;
      }

      this.map.flyTo({ ...location });
      this.map.once('moveend', () => {
        const bounds = this.map?.getBounds().toArray() ?? [];
        console.log('MAP move ended to bounds:', bounds);
        resolve(bounds);
      });
    });
  }

  async getTerrainElevation(lng: number, lat: number): Promise<number> {
    return new Promise((resolve, reject) => {
      // Ensure the map is idle before querying
      if (!this.map) {
        reject('Map is not initialized');
        return;
      }

      this.map.once('moveend', () => {
        const coordinates: mapboxgl.LngLatLike = [lng, lat];
        const elevation = this.map!.queryTerrainElevation(coordinates) ?? 0;
        resolve(elevation);
      });
    });
  }
}
