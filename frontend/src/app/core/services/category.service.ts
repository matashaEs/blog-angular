import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from '../interfaces/models/category.model.interface';

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
}
