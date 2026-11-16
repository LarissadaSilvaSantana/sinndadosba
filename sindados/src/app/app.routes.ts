import type { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
