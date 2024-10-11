import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SelectionModel } from '@angular/cdk/collections';
import { RouterModule } from '@angular/router';
import moment from 'moment';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { PostInterface } from '../../../../core/interfaces/models/post.model.interface';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  moment = moment;
  displayedColumns: string[] = ['select', 'id', 'title', 'totalComments', 'categoryId', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<PostInterface>([]);
  selection = new SelectionModel<PostInterface>(true, []);
  postService = inject(PostService);

  constructor() {
    this.loadPosts();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PostInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  loadPosts() {
    this.postService.getPosts({}).subscribe(posts => {
      this.dataSource.data = posts;
    });
  }

  deleteSelectedPosts() {
    const selectedPosts = this.selection.selected;
    const selectedPostsIds = selectedPosts.map(post => post.id);

    let promises = selectedPostsIds.map((id) => {
      let ob = this.postService.deletePost(id);

      return lastValueFrom(ob);
    });

    Promise.all(promises).then(() => {
      this.loadPosts();
    });
  }
}
