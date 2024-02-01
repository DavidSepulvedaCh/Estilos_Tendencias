import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],
  providers: [AuthService],
})
export class PasswordRecoveryComponent implements OnInit {
  showPassword = false;
  username = 'UserName';
  token: string | null = null;

  passwordRecoveryForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.passwordRecoveryForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: null }) => {
      this.token = params['token'] || null;
      console.log(this.token);
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.token) {
      window.alert('Token no encontrado en la URL');
      return;
    }

    if (this.passwordRecoveryForm.invalid) {
      window.alert('Por favor, llene todos los campos');
      return;
    }

    const newPassword = this.passwordRecoveryForm.get('newPassword')?.value;
    this.authService.resetPassword(this.token, newPassword).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        window.alert(error.error.message);
      }
    );
  }
}
