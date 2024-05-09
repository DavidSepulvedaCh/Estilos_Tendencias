import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError } from "rxjs";
import { Product } from "../models/product";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class CarshoppingService {
    private carItemCountSubject = new BehaviorSubject<number>(0);
    carItemCount$ = this.carItemCountSubject.asObservable();
    products: Product[] = [];
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/shopping/car-shopping`).pipe(
            catchError(error => {
                console.error('Error getting products: ', error);
                throw error;
            })
        );
    }

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
        console.log("Actualizando cantidad de producto.");
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
