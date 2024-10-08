import { AfterContentInit, Component, Input, inject } from '@angular/core';
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
export class PostsListComponent implements AfterContentInit{
  @Input() categoryId?: number;
  @Input() tagId?: number;
  posts: PostInterface[] = [];
  postService = inject(PostService);

  ngAfterContentInit(): void {
    this.postService.getPosts({
      categoryId: this.categoryId,
      tagId: this.tagId
    }).subscribe((data) => {
      this.posts = data;
    })
  }
}
