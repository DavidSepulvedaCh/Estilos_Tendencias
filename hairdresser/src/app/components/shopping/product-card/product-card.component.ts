import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  OnInit,
} from '@angular/core';
import { Product } from 'src/app/models/product';
import { CarshoppingService } from 'src/app/services/carshopping.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
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

  @Input() product!: Product;

  @Output() onDelete = new EventEmitter<string>();
  @Output() onSave = new EventEmitter<Product>();
  @Output() onChange = new EventEmitter<Product>();

  constructor(
    private _carShoppingService: CarshoppingService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

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
