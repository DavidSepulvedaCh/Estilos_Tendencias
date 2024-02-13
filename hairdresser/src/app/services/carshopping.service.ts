import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root",
})

export class CarshoppingService {
    private apiUrl = environment.apiUrl;
    private carItemCountSubject = new BehaviorSubject<number>(0);
    carItemCount$ = this.carItemCountSubject.asObservable();

    constructor(private http: HttpClient, private authService: AuthService) { }

    getCarshopping(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/carshopping`);
    }

    addCarshopping(carshoppingData: any): Observable<any> {
        const currentCount = this.carItemCountSubject.value;
        this.carItemCountSubject.next(currentCount + 1);
        const options = {
            headers: {
                Authorization: this.authService.getToken(),
            },
        }
        return this.http.post<any>(`${this.apiUrl}/`, carshoppingData, options);
    }

    deleteCarshopping(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/carshopping/${id}`);
    }
}