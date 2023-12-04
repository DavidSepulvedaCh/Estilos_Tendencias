import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    private apiURL = "http://localhost:3000/api/product/getProducts";

    public Products: Array<Product>;

    constructor(private http: HttpClient) {
        this.Products = [];
    }

    getProducts(): Observable<Product> {
        return this.http.get<Product>(this.apiURL);
    }

}
