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
      const formData = this.loginForm.value;

      this.authService.login(formData).subscribe(
        (response) => {
          this.authService.saveToken(response.tokenUsuario);
          window.alert("Login exitoso");

          this.router.navigate(['/contact']);
        },
        (error) => {
          window.alert("Error al ingresar");
        }
      );
    }
  }
}
