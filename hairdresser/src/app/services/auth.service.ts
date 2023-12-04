import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/user';

    constructor(private http: HttpClient) { }

    login(userData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, userData);
    }
    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
