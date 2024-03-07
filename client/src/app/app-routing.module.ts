import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routing').then((r) => r.HOME_ROUTES)
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.routing').then((r) => r.AUTH_ROUTES)
  },
  {
    path: 'boards',
    loadChildren: () => import('./boards/boards.routing').then((r) => r.BOARDS_ROUTES),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
