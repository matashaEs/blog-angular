import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  posts = [
    {
      id: 1,
      title: 'Post 1',
      content: "Content 1",
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Post 2',
      content: "Content 2",
      createdAt: new Date()
    },
    {
      id: 3,
      title: 'Post 3',
      content: "Content 3",
      createdAt: new Date()
    },
    {
      id: 4,
      title: 'Post 4',
      content: "Content 4",
      createdAt: new Date()
    }
  ]
}
