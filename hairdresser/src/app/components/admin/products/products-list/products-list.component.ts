import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [ProductService]
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
    quantity: 0
  };

  isUpdateModalVisible = false;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      (data: any) => {
        if (data && data.Products && Array.isArray(data.Products)) {
          this.products = data.Products;
          console.log(this.products);
        } else {
          console.error('La estructura de datos de la API no coincide con la esperada');
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

  blockProduct(product: Product): void {
  }

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
          window.alert('Producto actualizado correctamente');
          window.location.reload();
        } else {
          console.error('La estructura de datos de la API no coincide con la esperada');
        }
      },
      (error) => {
        window.alert('Error al actualizar el producto');
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

  deleteProduct(product: Product) {
    this._productService.deleteProduct(product.id).subscribe(
      (response: any) => {
        if (response && response.message) {
          window.alert('Producto eliminado correctamente');
          window.location.reload();
        } else {
          console.error('La estructura de datos de la API no coincide con la esperada');
        }
      },
      (error) => {
        window.alert('Error al eliminar el producto');
        console.error('Error al eliminar el producto:', error);
      }
    );
  }

  showDeleteConfirmation() {
    this.confirmDelete = true;
  }

}