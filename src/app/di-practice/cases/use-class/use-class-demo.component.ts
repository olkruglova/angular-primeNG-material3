import { Component, inject } from '@angular/core';
import { AbstractLogger } from '../../services/abstract-logger';
import { SilentLoggerService } from '../../services/silent-logger.service';

// useClass: Angular creates a NEW instance of SilentLoggerService and provides
// it to anyone in this subtree who injects AbstractLogger.
// The parent provides ConsoleLoggerService — this component overrides it locally.
// Key difference vs useExisting: useClass creates a new instance;
//                                useExisting reuses an existing one.
@Component({
  selector: 'app-use-class-demo',
  standalone: true,
  providers: [
    { provide: AbstractLogger, useClass: SilentLoggerService },
  ],
  templateUrl: './use-class-demo.component.html',
  styleUrl: './use-class-demo.component.scss',
})
export class UseClassDemoComponent {
  logger = inject(AbstractLogger);

  send(): void {
    this.logger.log('test message');
  }
}
