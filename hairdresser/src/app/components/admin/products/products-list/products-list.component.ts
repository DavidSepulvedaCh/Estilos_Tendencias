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
  selectedProduct: Product = {
    name: '',
    price: 0,
    description: '',
    stock: 0,
    image: '',
    id: '',
    brand: '',
    category: ''
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

  deleteProduct(product: Product): void {
  }

  closeUpdateModal() {
    this.isUpdateModalVisible = false;
  }


  updateProductInList(updatedProduct: any) {
    this._productService.updateProduct(updatedProduct._id, updatedProduct).subscribe(
      (data: any) => {
        if (data && data.product) {
          this.updateProductInList(data.product);
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


}


