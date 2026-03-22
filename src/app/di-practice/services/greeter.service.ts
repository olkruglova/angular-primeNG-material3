// Not @Injectable — instantiated by a factory function, not Angular's injector.
// The factory receives AppConfig (which itself is injected) and builds this
// service with runtime values. Use when construction depends on other services
// or conditions unknown at compile time (e.g., env config, feature flags).
export class GreeterService {
  constructor(readonly apiUrl: string) {}

  greet(): string {
    return `Hello! API is at ${this.apiUrl}`;
  }
}
