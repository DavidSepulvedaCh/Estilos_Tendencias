import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CarshoppingService } from 'src/app/services/carshopping.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  @Output() onDelete = new EventEmitter<string>();
  @Output() onSave = new EventEmitter<Product>();
  @Output() onChange = new EventEmitter<Product>();

  constructor(private _carShoppingService: CarshoppingService) { }

  delete() {
    this.onDelete.emit(this.product.id);
  }

  save() {
    this.onSave.emit(this.product);
  }

  change() {
    this.onChange.emit(this.product);
  }
}
