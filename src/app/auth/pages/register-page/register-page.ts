import { AuthService } from '@/auth/services/auth-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormUtils } from '../../../shared/utils/form-utils';
import { delay, map, pipe } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  formUtils = FormUtils;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);
  success = signal(false);
  showAlertSuccess = signal(true);
  showAlertError = signal(true);


  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    fullName: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.passwordPattern)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: [
      // Password matching
      this.formUtils.isFirstFieldEqualSecondField('password', 'password2')
    ],
  })

  async onSubmit() {
    this.showAlertError.set(true);
    this.showAlertSuccess.set(true);

    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => { this.hasError.set(false) }, (2000));
      return;
    }
    const { email = '', password = '', fullName = '' } = this.registerForm.value;

    this.authService.register(fullName!, email!, password!).subscribe({
      next: () => {
        this.success.set(true);
        setTimeout(()=>{
          this.router.navigateByUrl('/');
        },(3000))
      }, error: (err) => {
        const message: string = err.error.message;
        if (message.includes('Key (email)=') && message.includes('already exists'))
          this.registerForm.controls['email'].setErrors({
            emailTaken: true
          })
        return;
      }
    }
    )
  }

}
