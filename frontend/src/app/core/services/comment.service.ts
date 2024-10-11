import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommentInterface } from '../interfaces/models/comment.model.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.BACKEND_API_URL+'/api/comments';
  httpClient = inject(HttpClient);
  authService = inject(AuthService); 

  constructor() { }

  getComments(postId: number) {
    return this.httpClient.get<CommentInterface[]>(`${this.baseUrl}/${postId}`);
  }

  createComment(content: string, postId: number) {
    return this.httpClient.post<CommentInterface[]>(`${this.baseUrl}`, {content, postId});
  }

  deleteComment(commentId: number) {
    return this.httpClient.delete<CommentInterface>(`${this.baseUrl}`, {
      body: {
        commentId
      }
    })
  }
}
