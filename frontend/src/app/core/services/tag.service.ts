import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PostTagInterface } from '../interfaces/models/post-tag.model.interface';
import { TagInterface } from '../interfaces/models/tag.model.interface';

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

  getTag(slug: string) {
    return this.httpClient.get<TagInterface>(this.baseUrl + '/getTagBySlug/'+slug);
  }

  getTags() {
    return this.httpClient.get<TagInterface[]>(this.baseUrl);
  }

  deleteTag(id: number) {
    return this.httpClient.delete(this.baseUrl, {
      body: {
        id
      }
    });
  }

  addTag({name}:{name?: string}) {
    return this.httpClient.post(this.baseUrl, {
      name
    });
  }

  updateTag({
    id, name
  }:{
    id?: number,
    name?: string
  }) {
    return this.httpClient.put(this.baseUrl, {
      id, name
    });
  }
}
