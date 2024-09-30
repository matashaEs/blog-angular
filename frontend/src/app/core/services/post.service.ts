import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PostInterface } from '../interfaces/models/post.model.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.BACKEND_API_URL+'/api/posts';
  httpClient = inject(HttpClient);

  constructor() { }

  getPosts(){
    return this.httpClient.get<PostInterface[]>(this.baseUrl);
  }

  getPostBySlug(slug: string) {
    return this.httpClient.get<PostInterface>(`${this.baseUrl}/slug/${slug}`);
  }
}
