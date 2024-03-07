import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment/environment';
import { Router } from '@angular/router';
import { BoardInterface } from '@shared/models/boards.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly BOARDS_API_URL = `${environment.apiUrl}boards/`;

  getBoards(): Observable<BoardInterface[]> {
    return this.http.get<BoardInterface[]>(this.BOARDS_API_URL);
  }

  createBoard(title: string): Observable<BoardInterface> {
    return this.http.post<BoardInterface>(this.BOARDS_API_URL, { title });
  }
}
