import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (route, segments) => {
  // console.log('NotAuthenticatedGuard');
  const authService= inject(AuthService);
  const router = inject(Router);

  // const isAuthenticated =  authService.authStatus();
  const isAuthenticated = await firstValueFrom( authService.checkStatus());

  if(isAuthenticated){
    router.navigateByUrl('/');
    return false;
  }


  return true;
};
