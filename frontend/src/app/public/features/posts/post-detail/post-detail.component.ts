import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { PostInterface } from '../../../../core/interfaces/models/post.model.interface';
import moment from 'moment';
import { PostTagInterface } from '../../../../core/interfaces/models/post-tag.model.interface';
import { TagService } from '../../../../core/services/tag.service';
import { CommentInterface } from '../../../../core/interfaces/models/comment.model.interface';
import { CommentService } from '../../../../core/services/comment.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {

  moment: any = moment;

  route = inject(ActivatedRoute);
  tagsService = inject(TagService);
  postService = inject(PostService);
  commentServie = inject(CommentService);

  post?: PostInterface;
  postTags: PostTagInterface[] = [];
  comments: CommentInterface[] = [];

  constructor() {
    this.route.params.subscribe((params) => {
      this.loadPost(params['slug']);
    });
  }

  loadPost(slug: string) {
    this.postService.getPostBySlug(slug).subscribe((data) => {
      this.post = data;

      this.loadTags();
      this.loadComments();
    });
  }

  loadTags() {
    if(this.post) {
      this.tagsService.getPostTags(this.post.id).subscribe((data) => {
        this.postTags = data;
      });
    }
  }

  loadComments() {
    if(this.post) {
      this.commentServie.getComments(this.post.id).subscribe((data) => {
        this.comments = data;
      });
    }
  }
}
