import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkService } from 'src/app/services/work.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
  providers: [WorkService]
})
export class CreateServiceComponent {
  serviceForm: FormGroup;
  selectedFile: File | null = null;
  selectedImage: string | null = null;
  categories: string[] = ['Damas', 'Caballeros', 'Niños', 'Niñas'];

  constructor(private formBuilder: FormBuilder, private _workService: WorkService, private _snackBar: MatSnackBar) {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [null]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;

      if (!serviceData.name || !serviceData.category || !serviceData.description) {
        this._snackBar.open('Ingrese todos los campos', 'Cerrar', {
          duration: 3000,
        });
      }

      const formData = new FormData();
      formData.append('name', serviceData.name);
      formData.append('description', serviceData.description);
      formData.append('category', serviceData.category);
      formData.append('image', this.selectedFile!);

      this.printFormData(formData);

      this._workService.addService(formData).subscribe(
        (data) => {
          this._snackBar.open('¡Servicio creado exitosamente!', 'Cerrar', {
            duration: 3000,
          });
          this.serviceForm.reset();
          this.selectedImage = null;
        },
        (error) => {
          console.log('Error al realizar la solicitud:', error);
        }
      );
    }
  }

  printFormData(formData: FormData) {
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
  }
}
