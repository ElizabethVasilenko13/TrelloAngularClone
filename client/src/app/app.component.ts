import { Component, OnInit, inject } from '@angular/core';
import { AuthApiService } from './auth/services/auth-api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  protected authService = inject(AuthApiService);

  ngOnInit(): void {
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe({
        next: (currentUser) => {
          this.authService.setCurrentUser(currentUser);
        },
        error: (err) => {
          console.log(err);
          this.authService.setCurrentUser(null);
        }
      });
  }
}
