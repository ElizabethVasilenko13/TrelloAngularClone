import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '@shared/components/topbar/topbar.component';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [CommonModule, TopbarComponent],
  templateUrl: './board-page.component.html'
})
export class BoardPageComponent {}
