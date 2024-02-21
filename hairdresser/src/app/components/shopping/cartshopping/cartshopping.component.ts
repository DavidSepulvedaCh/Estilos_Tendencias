import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CarshoppingService } from 'src/app/services/carshopping.service';

@Component({
  selector: 'cartshopping',
  templateUrl: './cartshopping.component.html',
  styleUrls: ['./cartshopping.component.css']
})
export class CartshoppingComponent implements OnInit {

  constructor(private _carShoppingService: CarshoppingService) { }

  products: Product[] = [];
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;

  ngOnInit() {
    this.products = this._carShoppingService.products;
    this.calculateTotal();
  }

  eliminarProducto(id: string) {
    this._carShoppingService.deleteCarshopping(id);
    this.calculateTotal();
  }

  guardarProducto(producto: Product) {
    console.log('Producto guardado:', producto);
  }

  onComprar() {
    alert("¡Gracias por tu compra!");
  }

  actualizarCantidad(producto: Product) {
    console.log('Producto actualizado:', producto);
    this._carShoppingService.updateQuantity(producto.id, producto.quantity);

    this.calculateTotal();
  }


  calculateTotal() {
    this.subtotal = this.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    if (this.subtotal > 120000) {
      this.envio = 0;
    } else {
      this.envio = 12500;
    }
    this.total = this.subtotal + this.envio;
  }
}
