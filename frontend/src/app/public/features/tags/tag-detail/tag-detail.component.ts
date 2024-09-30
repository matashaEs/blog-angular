import { Component, inject } from '@angular/core';
import { PostDetailComponent } from '../../posts/post-detail/post-detail.component';
import { PostsListComponent } from '../../posts/posts-list/posts-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-detail',
  standalone: true,
  imports: [
    PostsListComponent
  ],
  templateUrl: './tag-detail.component.html',
  styleUrl: './tag-detail.component.scss'
})
export class TagDetailComponent {
  route = inject(ActivatedRoute);
  tag = '';

  constructor() {
    this.route.params.subscribe(params => {
      this.tag = params['tag'];
    });
  }
}
