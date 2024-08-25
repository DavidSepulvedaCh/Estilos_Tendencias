import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [ProductService]
})
export class CreateProductComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;
  selectedImage: string | null = null;


  constructor(private formBuilder: FormBuilder, private _productService: ProductService, private _snackBar: MatSnackBar) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
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


  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (!productData.name || !productData.category || !productData.description) {
        this._snackBar.open('Ingrese todos los campos obligatorios', 'Cerrar', {
          duration: 3000,
        });
        return;
      }

      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('category', productData.category);
      formData.append('imagen', this.selectedFile!);

      this.printFormData(formData);

      this._productService.addProduct(formData).subscribe(
        (data) => {
          console.log(data);
          this._snackBar.open('¡Producto creado exitosamente!', 'Cerrar', {
            duration: 5000,
          });
          this.productForm.reset();
          this.selectedImage = null;
        },
        (error) => {
          this._snackBar.open('Error al realizar la solicitud.', 'Cerrar', {
            duration: 3000,
          });
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
