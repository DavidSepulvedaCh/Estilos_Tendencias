import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn: "root",
})
export class CarshoppingService {
    private carItemCountSubject = new BehaviorSubject<number>(0);
    carItemCount$ = this.carItemCountSubject.asObservable();
    products: Product[] = [];

    constructor() { }

    addCarshopping(product: Product): void {
        const existingProduct = this.products.find((p) => p.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const newProduct = { ...product, quantity: 1 };
            this.products.push(newProduct);
        }
        this.updateItemCount();
    }

    deleteCarshopping(id: string): void {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            console.log("Producto eliminado.", this.products);
            this.updateItemCount();
        }
    }

    updateQuantity(id: string, quantity: number): void {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            product.quantity = quantity;
            this.updateItemCount();
        }
    }

    private updateItemCount(): void {
        this.carItemCountSubject.next(this.products.length);
    }
}
