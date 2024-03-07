import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsService } from '@shared/services/boards.service';
import { BoardInterface } from '@shared/models/boards.interface';
import { take } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InlineFormComponent } from '@shared/components/inline-form/inline-form.component';

@Component({
  selector: 'app-boards-page',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, InlineFormComponent, RouterLink],
  templateUrl: './boards-page.component.html'
})
export class BoardsPageComponent implements OnInit {
  private boardsService = inject(BoardsService);
  protected boards: BoardInterface[] = [];

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(): void {
    this.boardsService
      .getBoards()
      .pipe(take(1))
      .subscribe({
        next: (boards) => (this.boards = boards),
        error: (err) => console.log(err)
      });
  }

  createBoard(title: string): void {
    this.boardsService
      .createBoard(title)
      .pipe(take(1))
      .subscribe({
        next: (board) => (this.boards = [...this.boards, board]),
        error: (err) => console.log(err)
      });
  }
}
