import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/services/authGuard.service';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [AuthService],
})
export class CreateComponent implements OnInit {
  loginForm!: FormGroup;
  public username = "";
  showForgotPasswordModal = false;
  forgotPasswordEmail: string = '';
  emailValue = '';
  passwordValue = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthGuard
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.emailValue, this.passwordValue).subscribe(
        (response: any) => {
          const route = this.auth.redirectUrl;
          console.log(route);
          this.router.navigate([route]);
        },
        (error: any) => {
          window.alert("Error al iniciar sesión");
        }
      );
    }
  }

  openForgotPasswordModal() {
    this.showForgotPasswordModal = true;
    console.log(this.showForgotPasswordModal);
  }

  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
  }

  sendPasswordRecoveryEmail() {
    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe(
      (response: any) => {
        this.closeForgotPasswordModal();
        window.alert("Se ha enviado un correo para recuperar tu contraseña");
      },
      (error: any) => {
        console.error('Error en la solicitud de recuperación de contraseña:', error);
        window.alert("Error al enviar el correo para recuperar tu contraseña");
      }
    );
  }
}
