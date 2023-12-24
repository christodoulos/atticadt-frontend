import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  authReducer,
  loginEffect,
  mapReducer,
  setLocationEffect,
  saveMapEffect,
  mapInitializeEffect,
  showCustomLayersEffect,
  hideCustomLayersEffect,
  setMapConfigPropertyEffect,
} from '@atticadt/state';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '41569250829-h0p6t59q5fs6jl288svjee23o41o3d9b.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err: any) => {
          console.log(err);
        },
      } as SocialAuthServiceConfig,
    },
    provideHttpClient(withFetch()),
    provideStore({
      auth: authReducer,
      map: mapReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([
      {
        loginEffect,
        setLocationEffect,
        saveMapEffect,
        mapInitializeEffect,
        showCustomLayersEffect,
        hideCustomLayersEffect,
        setMapConfigPropertyEffect,
      },
    ]),
  ],
};
