import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'src/app/auth/services/auth-api.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  private authService = inject(AuthApiService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
