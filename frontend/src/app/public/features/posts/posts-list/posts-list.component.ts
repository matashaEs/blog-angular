import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { PostInterface } from '../../../../core/interfaces/models/post.model.interface';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  posts: PostInterface[] = [];
  postService = inject(PostService);

  constructor() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    })
  }
}
