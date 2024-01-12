import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable()
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(userData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/user/login`, userData);
    }

    getUserInfo(): Observable<any> {
        const token = this.getToken();

        if (!token) {
            return of(null);
        }
        const headers = new HttpHeaders({
            'Authorization': `${token}`
        });

        return this.http.post<any>(`${this.apiUrl}/user/information`, {}, { headers });
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
