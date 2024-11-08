import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-suppliers',
  templateUrl: './create-suppliers.component.html',
  styleUrls: ['./create-suppliers.component.css']
})
export class CreateSuppliersComponent {
  supplierForm: FormGroup;
  selectedFile: File | null = null;
  selectedImage: string | null = null;

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private supplierService: SupplierService) {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      imagen: [null]
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

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const formData = new FormData();
      formData.append('name', this.supplierForm.get('name')?.value);
      formData.append('category', this.supplierForm.get('category')?.value);
      formData.append('image', this.selectedFile as Blob);

      console.log('FormData values:');
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.supplierService.addSupplier(formData).subscribe(
        (res) => {
          console.log(res);
          this._snackBar.open('Proveedor creado exitosamente.', 'Close', {
            duration: 2000,
          });
          this.supplierForm.reset();
        },
        (err) => {
          console.log(err);
          this._snackBar.open('Error al crear el Proveedor', 'Close', {
            duration: 2000,
          });
        }
      );
    }
  }
}
