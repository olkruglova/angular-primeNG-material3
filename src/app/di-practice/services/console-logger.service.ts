import { Injectable } from '@angular/core';
import { AbstractLogger } from './abstract-logger';

@Injectable()
export class ConsoleLoggerService extends AbstractLogger {
  readonly instanceId = Math.random().toString(36).slice(2, 7);

  override log(msg: string): void {
    const entry = `[Console#${this.instanceId}] ${msg}`;
    this.messages.push(entry);
    console.log(entry);
  }
}
