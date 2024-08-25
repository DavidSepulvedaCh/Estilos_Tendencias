import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = environment.apiUrl;

  public Posts: Array<Post>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.Posts = [];
  }

  addPost(PostData: FormData): Observable<any> {
    const options = {
      headers: {
        Authorization: this.authService.getToken(),
      },
    };

    return this.http.post<any>(
      `${this.apiURL}/post/save-post`,
      PostData,
      options
    );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/post/get-posts`);
  }

  /* updatePost(id: string, params: FormData): Observable<Post> {
        const options = {
            headers: {
                'Authorization': this.authService.getToken(),
            }
        };

        console.log("FormData values:");
        params.forEach((value, key) => {
            console.log(key, value);
        });

        return this.http.put<Post>(`${this.apiURL}/Post/update-Post/${id}`, params, options);
    } */

  deletePost(id: string): Observable<any> {
    const options = {
      headers: {
        Authorization: this.authService.getToken(),
      },
    };

    return this.http.delete<any>(
      `${this.apiURL}/post/delete-post/${id}`,
      options
    );
  }
}
