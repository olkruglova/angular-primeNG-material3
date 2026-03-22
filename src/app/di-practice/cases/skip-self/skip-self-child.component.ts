import { Component, inject } from '@angular/core';
import { CounterService } from '../../services/counter.service';

// This component has its OWN CounterService (providers: [CounterService]).
// @Self  (inject with { self: true })     → looks ONLY in this component's injector
// @SkipSelf (inject with { skipSelf: true }) → skips this injector, walks UP to parent
// Result: two different instances with different instanceIds, proving the lookup direction.
@Component({
  selector: 'app-skip-self-child',
  standalone: true,
  providers: [CounterService],
  templateUrl: './skip-self-child.component.html',
  styleUrl: './skip-self-child.component.scss',
})
export class SkipSelfChildComponent {
  // inject() options replace the old @Self(), @SkipSelf(), @Optional() decorators
  selfCounter     = inject(CounterService, { self: true });
  parentCounter   = inject(CounterService, { skipSelf: true });
}
