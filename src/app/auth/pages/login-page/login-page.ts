import { AuthService } from '@/auth/services/auth-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);
  //TODO:
  //! regex password: (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}


  //TODO: pulir el formulario
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => { this.hasError.set(false) }, (2000));
      return;
    }

    const {username: email = '', password = ''} = this.loginForm.value;

    this.authService.login(email ?? '',password ?? '').subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        // this.router.navigateByUrl('/')
        return;
      }

      this.hasError.set(true);
    });

    this.router.navigateByUrl('/');

  }

}
