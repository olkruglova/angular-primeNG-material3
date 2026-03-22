import { Component, inject } from '@angular/core';
import { CounterService } from '../../services/counter.service';

// providers: [CounterService] here means each instance of this component
// gets its OWN CounterService. Two <app-scoped-counter> in the parent →
// two independent counters, two different instanceIds.
@Component({
  selector: 'app-scoped-counter',
  standalone: true,
  providers: [CounterService],
  templateUrl: './scoped-counter.component.html',
  styleUrl: './scoped-counter.component.scss',
})
export class ScopedCounterComponent {
  counter = inject(CounterService);
}
