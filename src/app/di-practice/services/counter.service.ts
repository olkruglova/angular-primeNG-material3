import { Injectable } from '@angular/core';

// No providedIn — this service is NOT in the root injector.
// It must be listed in a component's providers: [] to become available.
// Each component that lists it gets its OWN instance, isolated from others.
// Destroyed when the component is destroyed (tied to component lifetime).
// Use for: per-form state, per-modal cart, per-widget counters.
@Injectable()
export class CounterService {
  readonly instanceId = Math.random().toString(36).slice(2, 7);
  count = 0;

  increment(): void {
    this.count++;
  }
}
