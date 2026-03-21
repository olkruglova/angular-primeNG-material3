import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Material Web — import side-effectful JS to register the custom elements
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/fab/fab.js';
import '@material/web/chips/chip-set.js';
import '@material/web/chips/assist-chip.js';
import '@material/web/icon/icon.js';
import '@material/web/divider/divider.js';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, CardModule, TagModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular + PrimeNG + Material Web';
}
