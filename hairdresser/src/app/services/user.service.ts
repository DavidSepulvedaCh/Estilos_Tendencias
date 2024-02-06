import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AuthService } from "./auth.service";

@Injectable()
export class UserService {
    private apiURL = environment.apiUrl;

    public Users: Array<User>;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.Users = [];
    }

    getUsers(): Observable<User> {
        return this.http.get<User>(`${this.apiURL}/user/users`);
    }

    deleteUser(id: string): Observable<User> {
        const authToken = this.authService.getToken();
        console.log('id: ', id);

        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `${authToken}`
            })
        };

        return this.http.delete<User>(`${this.apiURL}/user/delete-user/${id}`, httpOptions);
    }

}
