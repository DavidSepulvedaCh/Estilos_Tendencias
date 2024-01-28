import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  alertCount = 0;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      confirmarCorreo: ['', [Validators.required, Validators.email]],
      confirmarClave: ['', [Validators.required, Validators.minLength(6)]],
      aceptarTyC: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordConfirming });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.correo !== this.registerForm.value.confirmarCorreo ||
        this.registerForm.value.clave !== this.registerForm.value.confirmarClave
      ) {
        console.error('Los campos de confirmación no coinciden');
        // Muestra un mensaje de error específico si los campos de confirmación no coinciden
        this.registerForm.setErrors({ passwordMismatch: true });
        return;
      }

      // Construir el objeto con la estructura requerida
      const registerData = {
        name: this.registerForm.value.nombre,
        lastName: this.registerForm.value.apellido,
        email: this.registerForm.value.correo,
        password: this.registerForm.value.clave,
        role: 'user'
      };

      // Llamar al servicio para el registro
      this.authService.register(registerData).subscribe(
        (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error durante el registro', error);
        }
      );

    } else {
      // Formulario inválido, puedes mostrar un mensaje de error o realizar alguna acción.
      console.error('Formulario inválido');
    }
  }

  // Validación personalizada para comprobar si los campos de confirmación coinciden
  passwordConfirming(c: AbstractControl): { passwordMismatch: boolean } | null {
    const claveControl = c.get('clave');
    const confirmarClaveControl = c.get('confirmarClave');

    if (claveControl && confirmarClaveControl && claveControl.value !== confirmarClaveControl.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

}
