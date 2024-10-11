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

  getPosts(filters: {
    categoryId?: number,
    tagId?: number
  }){
    let url = this.baseUrl;
    const params = new URLSearchParams();
    if(filters.categoryId) {
      params.set('categoryId', filters.categoryId.toString());
    }
    if(filters.tagId) {
      params.set('tagId', filters.tagId.toString());
    }

    url += '?' + params.toString();

    return this.httpClient.get<PostInterface[]>(url);
  }

  getPostBySlug(slug: string) {
    return this.httpClient.get<PostInterface>(`${this.baseUrl}/slug/${slug}`);
  }

  deletePost(id: number) {
    return this.httpClient.delete(`${this.baseUrl}`, {
      body: {
        id
      }
    });
  }

  addPost({
    title, 
    content,
    categoryId,
    tagIds
  }:{
    title: string,
    content: string,
    categoryId: number,
    tagIds: number[]
  }){
    return this.httpClient.post<PostInterface>(this.baseUrl, {
      title,
      content,
      categoryId,
      tagIds
    });
  }

  updatePost({
    id,
    title, 
    content,
    categoryId,
    tagIds
  }:{
    id: number
    title: string,
    content: string,
    categoryId: number,
    tagIds: number[]
  }){
    return this.httpClient.put<PostInterface>(this.baseUrl, {
      id,
      title,
      content,
      categoryId,
      tagIds
    });
  }
}
