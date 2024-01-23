import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router
  ) { }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("correo ", this.emailValue);
      this.authService.login(this.emailValue, this.passwordValue).subscribe(
        (response: any) => {
          this.router.navigate(['/admin-panel']);
        },
        (error: any) => {
          console.error('Error en la solicitud de inicio de sesión:', error);
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
  }
}
