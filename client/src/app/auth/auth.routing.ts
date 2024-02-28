import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LOGIN_PATH, REGISTER_PATH } from '@shared/consts/route.pathes';

export const AUTH_ROUTES: Routes = [
  {
    path: LOGIN_PATH,
    component: LoginComponent
  },
  {
    path: REGISTER_PATH,
    component: RegisterComponent
  }
];
