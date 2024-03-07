import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boards-page.component.html'
})
export class BoardsPageComponent {
  constructor() {
    console.log('l');
  }
}
