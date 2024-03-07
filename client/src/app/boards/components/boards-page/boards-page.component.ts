import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiService } from '@shared/services/boards.service';

@Component({
  selector: 'app-boards-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boards-page.component.html'
})
export class BoardsPageComponent implements OnInit {
  private boardsService = inject(AuthApiService);
  ngOnInit(): void {
    this.boardsService.getBoards().subscribe({
      next: (boards) => console.log(boards)
    });
  }
}
