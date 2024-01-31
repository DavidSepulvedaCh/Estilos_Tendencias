// register.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare const grecaptcha: any; // Declare grecaptcha

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showErrorStacked: boolean = true;
  captchaKey: string = environment.captchaKey;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      confirmarCorreo: ['', [Validators.required, Validators.email]],
      confirmarClave: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      aceptarTyC: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordConfirming });
  }

  onRegisterSubmit(): void {
    grecaptcha.execute(this.captchaKey, { action: 'submit' }).then((token: string) => {
      this.onSubmit(token);
    });
  }

  onSubmit(token: string): void {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.correo !== this.registerForm.value.confirmarCorreo ||
        this.registerForm.value.clave !== this.registerForm.value.confirmarClave
      ) {
        this.registerForm.setErrors({ passwordMismatch: true });
        return;
      }

      const registerData = {
        name: this.registerForm.value.nombre,
        lastName: this.registerForm.value.apellido,
        email: this.registerForm.value.correo,
        password: this.registerForm.value.clave,
        role: 'user'
      };

      this.authService.register(registerData).subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error during registration', error);
        }
      );

    } else {
      window.alert('Invalid form');
    }
  }

  passwordConfirming(c: AbstractControl): { passwordMismatch: boolean } | null {
    const claveControl = c.get('clave');
    const confirmarClaveControl = c.get('confirmarClave');

    if (claveControl && confirmarClaveControl && claveControl.value !== confirmarClaveControl.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    return valid ? null : { passwordInvalid: true };
  }
}
