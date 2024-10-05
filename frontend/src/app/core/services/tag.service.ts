import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PostTagInterface } from '../interfaces/models/post-tag.model.interface';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  baseUrl = environment.BACKEND_API_URL+'/api/tags';
  httpClient = inject(HttpClient);

  constructor() {}

  getPostTags(id: number) {
    return this.httpClient.get<PostTagInterface[]>(this.baseUrl + '/getPostTagRelations/' +id)
  }
}
