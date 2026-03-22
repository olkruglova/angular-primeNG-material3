import { Injectable } from '@angular/core';
import { AbstractLogger } from './abstract-logger';

// A silent implementation — swapped in via useClass to replace ConsoleLogger.
// Consumers inject AbstractLogger and never need to know which implementation
// they're getting. This is the power of useClass.
@Injectable()
export class SilentLoggerService extends AbstractLogger {
  readonly instanceId = Math.random().toString(36).slice(2, 7);

  override log(msg: string): void {
    const entry = `[Silent#${this.instanceId}] ${msg} (no console output)`;
    this.messages.push(entry);
    // intentionally no console.log — silent in production/test environments
  }
}
