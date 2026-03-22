import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { RemoteConfigService } from './di-practice/services/remote-config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.dark-mode' },
      },
    }),

    // Case 11: APP_INITIALIZER — runs before the app renders.
    // useFactory returns a function that returns a Promise.
    // Angular waits for the Promise to resolve before bootstrapping.
    // multi: true because APP_INITIALIZER is a multi-provider token.
    {
      provide: APP_INITIALIZER,
      useFactory: (config: RemoteConfigService) => () => config.load(),
      deps: [RemoteConfigService],
      multi: true,
    },
  ],
};
