import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from '../interfaces/models/category.model.interface';
import { CommentInterface } from '../interfaces/models/comment.model.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.BACKEND_API_URL+'/api/categories';
  httpClient = inject(HttpClient);

  constructor() { }

  getCategoryBySug(slug: string) {
    return this.httpClient.get<CategoryInterface>(`${this.baseUrl}/slug/${slug}`);
  }

  getCategories() {
    return this.httpClient.get<CategoryInterface[]>(this.baseUrl);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${this.baseUrl}`, {
      body: {id}
    });
  }

  addCategory({name}:{name: string}) {
    return this.httpClient.post<CategoryInterface>(this.baseUrl, {name})
  }

  updateCategory({id, name}: {id: number, name: string}) {
    return this.httpClient.put<CategoryInterface>(this.baseUrl, {id, name});
  }
}
