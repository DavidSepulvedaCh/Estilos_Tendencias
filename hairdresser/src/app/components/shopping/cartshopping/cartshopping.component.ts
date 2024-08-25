import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { CarshoppingService } from 'src/app/services/carshopping.service';

@Component({
  selector: 'cartshopping',
  templateUrl: './cartshopping.component.html',
  styleUrls: ['./cartshopping.component.css'],
})
export class CartshoppingComponent implements OnInit {
  constructor(
    private _carShoppingService: CarshoppingService,
    private _snackBar: MatSnackBar
  ) {}

  products: Product[] = [];
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;
  email: string = 'user@example.com';

  ngOnInit() {
    this.products = this._carShoppingService.car;
    this.calculateTotal();
  }

  eliminarProducto(id: string) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this._carShoppingService.updateItemCount();
      this.calculateTotal();
      this._snackBar.open('Producto eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  guardarProducto() {
    this._carShoppingService.saveCart(this.email).subscribe(
      () => {
        this._snackBar.open('Carrito guardado con éxito', 'Cerrar', {
          duration: 3000,
        });
      },
      (error) => {
        this._snackBar.open('Error al guardar el carrito', 'Cerrar', {
          duration: 3000,
        });
        console.error('Error guardando el carrito:', error);
      }
    );
  }

  actualizarCantidad(producto: Product) {
    const productToUpdate = this.products.find((p) => p.id === producto.id);
    if (productToUpdate) {
      productToUpdate.quantity = producto.quantity;
      this.calculateTotal();
      this._snackBar.open('Cantidad actualizada con éxito', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  calculateTotal() {
    this.subtotal = this.products.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );
    this.envio = this.subtotal > 120000 ? 0 : 12500;
    this.total = this.subtotal + this.envio;
  }

  onComprar() {
    alert('¡Gracias por tu compra!');
  }
}
