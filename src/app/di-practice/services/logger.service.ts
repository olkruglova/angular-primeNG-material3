import { Injectable } from '@angular/core';

// providedIn: 'root' — registered in the root injector.
// Angular creates exactly ONE instance for the entire app (singleton).
// It is also tree-shakeable: if nothing injects it, it won't be in the bundle.
// Use for: auth, user state, HTTP wrappers, toast notifications.
@Injectable({ providedIn: 'root' })
export class LoggerService {
  // Unique ID to prove that the same instance is shared everywhere
  readonly instanceId = Math.random().toString(36).slice(2, 7);

  log(msg: string): void {
    console.log(`[Logger#${this.instanceId}] ${msg}`);
  }
}
