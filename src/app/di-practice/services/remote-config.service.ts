import { Injectable } from '@angular/core';

// Used with APP_INITIALIZER in app.config.ts.
// APP_INITIALIZER runs before the app renders — Angular waits for all
// initializers to complete (Promise/Observable) before bootstrapping.
// Use for: loading remote config, verifying auth token, preloading data.
@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  config: Record<string, string> = {};

  load(): Promise<void> {
    // Simulate an async remote config fetch
    return new Promise(resolve => {
      setTimeout(() => {
        this.config = { theme: 'material3', version: '1.0.0', env: 'demo' };
        resolve();
      }, 0);
    });
  }
}
