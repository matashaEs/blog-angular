import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommentInterface } from '../interfaces/models/comment.model.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.BACKEND_API_URL+'/api/comments';
  httpClient = inject(HttpClient);

  constructor() { }

  getComments(postId: number) {
    return this.httpClient.get<CommentInterface[]>(`${this.baseUrl}/${postId}`);
  }
}
