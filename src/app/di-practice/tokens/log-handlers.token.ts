import { InjectionToken } from '@angular/core';

export interface LogHandler {
  name: string;
  handle(msg: string): void;
}

// multi: true means multiple providers contribute to an array under one token.
// Every { provide: LOG_HANDLERS, useValue: ..., multi: true } adds one entry.
// Consumers get LogHandler[] — all registered handlers collected together.
// This is how Angular's own HTTP_INTERCEPTORS and APP_INITIALIZER work.
export const LOG_HANDLERS = new InjectionToken<LogHandler[]>('LOG_HANDLERS');
