import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'di-practice',
    loadComponent: () =>
      import('./di-practice/di-practice.component').then(m => m.DiPracticeComponent),
  },
  { path: '', redirectTo: 'di-practice', pathMatch: 'full' },
];
