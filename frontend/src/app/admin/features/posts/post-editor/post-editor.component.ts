import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../../core/services/post.service';
import { PostInterface } from '../../../../core/interfaces/models/post.model.interface';
import { CategoryService } from '../../../../core/services/category.service';
import { CategoryInterface } from '../../../../core/interfaces/models/category.model.interface';
import { MatSelectModule } from '@angular/material/select';
import { TagInterface } from '../../../../core/interfaces/models/tag.model.interface';
import { TagService } from '../../../../core/services/tag.service';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.scss'
})
export class PostEditorComponent {
  fb = inject(FormBuilder);
  postService = inject(PostService);
  categoryService = inject(CategoryService);
  tagService = inject(TagService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  post: PostInterface | undefined; 
  categories: CategoryInterface[] = [];
  tags: TagInterface[] = [];
  showTagsDropdown = false;
  
  form = this.fb.group({
    title: ['', Validators.required],
    id: [''],
    content: ['', Validators.required],
    categoryId: [null, Validators.required],
    tagIds: this.fb.array([])
  })

  get selectedTags() {
    return this.tags.filter((tag) => {
      return this.form.value.tagIds?.includes(tag.id);
    })
  }

  constructor() {

    this.loadCategories();
    this.loadTags();

    this.route.params.subscribe((data) => {
      const slug = data['slug'];
      if(slug) {
        this.postService.getPostBySlug(slug).subscribe((post) => {
          this.post = post;
          this.form.patchValue({
            id: post.id+'',
            title: post.title,
            content: post.content,
            categoryId: post.categoryId as any
          })
          this.form.updateValueAndValidity();

          this.tagService.getPostTags(post.id).subscribe((tags) => {
            const tagIds = tags.map(tag => tag.tagId);

            const tagIdsFormArray = this.form.get('tagIds') as FormArray;
            tagIds.forEach((tagId) => {
              tagIdsFormArray.push(this.fb.control(tagId));
            })
          })
        });
      }
    })
  }

  create() {
    if(this.form.invalid) return

    this.postService.addPost({
      title: this.form.value.title!,
      content: this.form.value.content!,
      categoryId: this.form.value.categoryId!,
      tagIds: this.form.value.tagIds as any[]
      }).subscribe(() => {
      this.router.navigate(['/admin/posts']);
    })
  }

  update() {
    if(this.form.invalid) return

    this.postService.updatePost({
      id: parseInt(this.form.value.id!),
      title: this.form.value.title!,
      content: this.form.value.content!,
      categoryId: this.form.value.categoryId!,
      tagIds: this.form.value.tagIds as any[]
    }).subscribe(() => {
      alert('Post updated');
    })
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  loadTags() {
    this.tagService.getTags().subscribe((tags) => {
      this.tags = tags;
    })
  }

  addTag(tagId: number) {
    const tagIdsFormArray = this.form.get('tagIds') as FormArray;
    tagIdsFormArray.push(this.fb.control(tagId));
    this.showTagsDropdown = false;
  }

  removeTag(tagId: number) {
    const tagIdsFormArray = this.form.get('tagIds') as FormArray;
    const index = tagIdsFormArray.controls.findIndex((
      control
    ) => {
      return control.value === tagId;
    })
    tagIdsFormArray.removeAt(index);
  }
}
