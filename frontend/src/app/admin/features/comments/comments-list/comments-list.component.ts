import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, RouterModule } from '@angular/router';
import moment from 'moment';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { CommentService } from '../../../../core/services/comment.service';
import { CommentInterface } from '../../../../core/interfaces/models/comment.model.interface';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.scss'
})
export class CommentsListComponent {
  moment = moment;
  route = inject(ActivatedRoute);
  displayedColumns: string[] = ['select', 'id', 'content', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<CommentInterface>([]);
  selection = new SelectionModel<CommentInterface>(true, []);
  commentService = inject(CommentService);
  postId?: number;

  constructor() {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];

      this.loadComments();
    })
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
  checkboxLabel(row?: CommentInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  loadComments() {
    this.commentService.getComments(this.postId!).subscribe(comments => {
      this.dataSource.data = comments;
    });
  }

  deleteSelectedComments() {
    const selectedComments = this.selection.selected;
    const selectedCommentsIds = selectedComments.map(comment => comment.id);

    let promises = selectedCommentsIds.map((id) => {
      let ob = this.commentService.deleteComment(id);

      return lastValueFrom(ob);
    });

    Promise.all(promises).then(() => {
      this.loadComments();
    });
  }
}
