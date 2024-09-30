import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { PostInterface } from '../../../../core/interfaces/models/post.model.interface';
import moment from 'moment';

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
  postService = inject(PostService);

  post?: PostInterface;

  constructor() {
    this.route.params.subscribe((params) => {
      this.postService.getPostBySlug(params['slug']).subscribe((data) => {
        this.post = data;
      })
    })
  }
}
