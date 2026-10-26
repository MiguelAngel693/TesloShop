import { AuthService } from '@/auth/services/auth-service';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  authService = inject(AuthService);

  user = computed(() => this.authService.user())

}
