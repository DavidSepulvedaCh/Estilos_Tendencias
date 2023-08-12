import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  public products: Array<Product> = [];
  public uniqueCategories: string[] = []; // Agrega esta línea

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products = this._productService.getProduct();
    this.uniqueCategories = this.getUniqueCategories(); // Agrega esta línea
  }

  activeCategory: string | null = null;
  activeId: boolean = false;

  changeCategory(category: string | null): void {
    this.activeCategory = category;
    this.activeId = !this.activeId;
  }

  filteredProducts(): Array<Product> {
    return this.activeCategory === null
      ? this.products
      : this.products.filter(product => product.category === this.activeCategory);
  }

  // Nueva función para obtener categorías únicas
  getUniqueCategories(): string[] {
    const categoriesSet = new Set<string>();
    this.products.forEach(product => {
      if (product.category) {
        categoriesSet.add(product.category);
      }
    });
    return Array.from(categoriesSet);
  }
}
