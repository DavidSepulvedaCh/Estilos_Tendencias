import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [ProductService],
})
export class ProductsListComponent implements OnInit {
  public products: Product[] = [];
  selectedImage: File | null = null;
  changed: boolean = false;
  confirmDelete: boolean = false;

  selectedProduct: Product = {
    id: '',
    name: '',
    price: 0,
    description: '',
    stock: 0,
    image: '',
    brand: '',
    category: '',
    quantity: 0,
  };

  isUpdateModalVisible = false;

  constructor(private _productService: ProductService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      (data: any) => {
        if (data && data.Products && Array.isArray(data.Products)) {
          this.products = data.Products;
          console.log(this.products);
        } else {
          console.error(
            'La estructura de datos de la API no coincide con la esperada'
          );
        }
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  updateProduct(product: any) {
    this.selectedProduct = { ...product };
    this.isUpdateModalVisible = true;
  }

  blockProduct(product: Product): void { }

  closeUpdateModal() {
    this.isUpdateModalVisible = false;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedImage = file;
    this.changed = true;
  }

  updateProductInList(updatedProduct: any) {
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', updatedProduct.price);
    formData.append('stock', updatedProduct.stock);
    formData.append('category', updatedProduct.category);
    if (this.changed == true) {
      formData.append('imagen', this.selectedImage!);
    }

    this._productService.updateProduct(updatedProduct.id, formData).subscribe(
      (response: any) => {
        if (response && response.product) {
          this._snackBar.open('¡Producto actualizado correctamente!', 'Cerrar', {
            duration: 5000,
          });
          this.products = this.products.map(p =>
            p.id === updatedProduct.id ? { ...response.product } : p
          );
          this.closeUpdateModal();
        } else {
          console.error(
            'La estructura de datos de la API no coincide con la esperada'
          );
        }
      },
      (error) => {
        this._snackBar.open('Error al actualizar el producto', 'Cerrar', {
          duration: 5000,
        });
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

  deleteProduct() {
    if (!this.selectedProduct.id) {
      console.error('No hay producto seleccionado para eliminar.');
      return;
    }

    this._productService.deleteProduct(this.selectedProduct.id).subscribe(
      (response: any) => {
        if (response && response.message) {
          this._snackBar.open('¡Producto eliminado correctamente!', 'Cerrar', {
            duration: 5000,
          });
          this.products = this.products.filter(p => p.id !== this.selectedProduct.id);
          this.confirmDelete = false;
        } else {
          console.error(
            'La estructura de datos de la API no coincide con la esperada'
          );
        }
      },
      (error) => {
        this._snackBar.open('Error al eliminar el producto', 'Cerrar', {
          duration: 5000,
        });
        console.error('Error al eliminar el producto:', error);
      }
    );
  }

  showDeleteConfirmation(product: Product) {
    this.selectedProduct = product;
    this.confirmDelete = true;
  }
}
