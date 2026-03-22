import { Component, inject, InjectionToken } from '@angular/core';
import { KeyValuePipe } from '@angular/common';

import { LoggerService }        from './services/logger.service';
import { CounterService }       from './services/counter.service';
import { AbstractLogger }       from './services/abstract-logger';
import { ConsoleLoggerService } from './services/console-logger.service';
import { GreeterService }       from './services/greeter.service';
import { RemoteConfigService }  from './services/remote-config.service';
import { APP_CONFIG, APP_CONFIG_VALUE, AppConfig } from './tokens/app-config.token';
import { LOG_HANDLERS, LogHandler } from './tokens/log-handlers.token';

import { ScopedCounterComponent } from './cases/scoped-counter/scoped-counter.component';
import { SkipSelfChildComponent } from './cases/skip-self/skip-self-child.component';
import { UseClassDemoComponent }  from './cases/use-class/use-class-demo.component';

// A token that is intentionally never provided anywhere — used for @Optional demo
const NEVER_PROVIDED = new InjectionToken<string>('NEVER_PROVIDED');

@Component({
  selector: 'app-di-practice',
  standalone: true,
  imports: [ScopedCounterComponent, SkipSelfChildComponent, UseClassDemoComponent, KeyValuePipe],
  templateUrl: './di-practice.component.html',
  styleUrl: './di-practice.component.scss',
  providers: [
    // Case 3: component-scoped
    // CounterService has no providedIn, so it only exists here and below.
    // Children can inject it and get THIS same instance, unless they re-declare it.
    CounterService,

    // Case 5+7: useClass + useExisting setup
    ConsoleLoggerService,
    // Case 7: useExisting — AbstractLogger is an ALIAS for ConsoleLoggerService.
    // No new instance — both tokens point to the same object (same instanceId).
    // Compare with useClass which always creates a fresh instance.
    { provide: AbstractLogger, useExisting: ConsoleLoggerService },

    // Case 4: useValue — inject a plain config object via InjectionToken.
    // No class needed; any value (object, string, number, function) can be injected.
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },

    // Case 6: useFactory — GreeterService needs the API URL from AppConfig at runtime.
    // deps[] lists the tokens Angular injects and passes to the factory function.
    {
      provide: GreeterService,
      useFactory: (config: AppConfig) => new GreeterService(config.apiUrl),
      deps: [APP_CONFIG],
    },

    // Case 8: multi: true — each entry appends one item to the LOG_HANDLERS array.
    // Angular collects ALL multi-providers for the same token into a single array.
    // This is how HTTP_INTERCEPTORS and APP_INITIALIZER work internally.
    { provide: LOG_HANDLERS, useValue: { name: 'Console',   handle: (m: string) => console.log('[ConsoleHandler]', m)   } as LogHandler, multi: true },
    { provide: LOG_HANDLERS, useValue: { name: 'Storage',   handle: (m: string) => console.info('[StorageHandler]', m)  } as LogHandler, multi: true },
    { provide: LOG_HANDLERS, useValue: { name: 'Analytics', handle: (m: string) => console.debug('[AnalyticsHandler]', m) } as LogHandler, multi: true },
  ],
})
export class DiPracticeComponent {
  // ── Case 1: providedIn: 'root' ─────────────────────────────────────────────
  // inject() is the modern Angular 14+ syntax. No constructor parameter needed.
  // Works in components, directives, pipes, guards, resolvers, and plain functions.
  rootLogger = inject(LoggerService);

  // ── Case 2: constructor injection (classic) ────────────────────────────────
  // Explicit, easy to read in code reviews, required before Angular 14.
  // inject() is preferred for new code — less boilerplate.
  constructor(readonly remoteConfig: RemoteConfigService) {}

  // ── Case 3: component-scoped service ──────────────────────────────────────
  scopedCounter = inject(CounterService);

  // ── Case 4: InjectionToken + useValue ─────────────────────────────────────
  config = inject(APP_CONFIG);

  // ── Case 5: useClass (see UseClassDemoComponent for the swap) ─────────────
  // The demo child component overrides AbstractLogger with SilentLoggerService.

  // ── Case 7: useExisting ────────────────────────────────────────────────────
  // Both tokens resolve to the SAME ConsoleLoggerService instance
  abstractLogger = inject(AbstractLogger);
  concreteLogger = inject(ConsoleLoggerService);
  get sameInstance(): boolean {
    return this.abstractLogger === this.concreteLogger;
  }

  // ── Case 6: useFactory ─────────────────────────────────────────────────────
  greeter = inject(GreeterService);

  // ── Case 8: multi ──────────────────────────────────────────────────────────
  logHandlers = inject(LOG_HANDLERS);

  // ── Case 9: @Optional ──────────────────────────────────────────────────────
  // NEVER_PROVIDED has no provider anywhere — without optional: true this would throw.
  // With optional: true Angular returns null instead.
  neverProvided = inject(NEVER_PROVIDED, { optional: true });

  // ── Case 11: APP_INITIALIZER ───────────────────────────────────────────────
  // RemoteConfigService was loaded before the app rendered (see app.config.ts).
  // By the time this component exists, config is already populated.
  get remoteConfigData() { return this.remoteConfig.config; }

  // Actions for the demo
  sendToAll(): void {
    this.logHandlers.forEach(h => h.handle('hello from DiPractice'));
  }

  logViaAbstract(): void {
    this.abstractLogger.log('sent via AbstractLogger token');
  }
}
