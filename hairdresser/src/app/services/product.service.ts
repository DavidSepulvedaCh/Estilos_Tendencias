import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environment/environment";

@Injectable()
export class ProductService {
    private apiURL = environment.apiUrl;

    public Products: Array<Product>;

    constructor(private http: HttpClient) {
        this.Products = [];
    }

    getProducts(): Observable<Product> {
        return this.http.get<Product>(`${this.apiURL}/product/getProducts`);
    }

}
