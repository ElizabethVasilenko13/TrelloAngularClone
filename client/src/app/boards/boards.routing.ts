import { Routes } from '@angular/router';
import { BoardsPageComponent } from './components/boards-page/boards-page.component';
import { BoardPageComponent } from './components/board-page/board-page.component';

export const BOARDS_ROUTES: Routes = [
  {
    path: '',
    component: BoardsPageComponent
  },
  {
    path: ':id',
    component: BoardPageComponent
  }
];
