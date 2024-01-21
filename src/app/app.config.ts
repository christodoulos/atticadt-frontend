import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
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
  ],
};
