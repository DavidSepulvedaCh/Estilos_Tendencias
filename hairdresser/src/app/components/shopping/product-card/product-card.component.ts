import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  @Output() onDelete = new EventEmitter<string>();
  @Output() onSave = new EventEmitter<{ id: string; quantity: number }>();
  @Output() onChange = new EventEmitter<Product>();

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const cardElement = this.el.nativeElement.querySelector('.card');

    this.renderer.listen(cardElement, 'mousemove', (event) => {
      this.handleMouseMove(event);
    });

    this.renderer.listen(cardElement, 'mouseleave', () => {
      this.resetCardTransform();
    });
  }

  private handleMouseMove(event: MouseEvent) {
    const cardElement = event.currentTarget as HTMLElement;
    const boundingRect = cardElement.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left - boundingRect.width / 2;
    const offsetY = event.clientY - boundingRect.top - boundingRect.height / 2;
    const rotateFactorX = offsetX / (boundingRect.width / 2);
    const rotateFactorY = offsetY / (boundingRect.height / 2);
    const rotateValueX = rotateFactorX * 10;
    const rotateValueY = rotateFactorY * 10;

    this.renderer.setStyle(
      cardElement,
      'transform',
      `rotateX(${rotateValueY}deg) rotateY(${rotateValueX}deg)`
    );
  }

  private resetCardTransform() {
    const cardElement = this.el.nativeElement.querySelector('.card');
    this.renderer.setStyle(cardElement, 'transform', 'none');
  }

  delete() {
    this.onDelete.emit(this.product.id);
  }

  save() {
    this.onSave.emit({ id: this.product.id, quantity: this.product.quantity });
  }


  updateQuantity(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.product.quantity = +inputElement.value;
    this.onChange.emit(this.product);
    console.log('producto0', this.product);
  }
}
