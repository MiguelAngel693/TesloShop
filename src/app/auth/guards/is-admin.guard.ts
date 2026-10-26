import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // const isAuthenticated =  authService.authStatus();
  await firstValueFrom(authService.checkStatus());
  const isAdmin = authService.isAdmin();

  if(!isAdmin){
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
