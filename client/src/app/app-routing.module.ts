import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routing').then((r) => r.HOME_ROUTES)
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.routing').then((r) => r.AUTH_ROUTES)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
