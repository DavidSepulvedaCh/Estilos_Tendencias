import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  @Output() onEliminar = new EventEmitter();
  @Output() onGuardar = new EventEmitter();

  constructor() { }

  eliminar() {
    this.onEliminar.emit(this.product);
  }

  guardar() {
    this.onGuardar.emit(this.product);
  }

}
