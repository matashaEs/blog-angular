import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { User } from "./User";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { PostTag } from "./PostTag";
import { Category } from './Category';

@Table
export class Post extends Model<Post> {
  @Column({
    allowNull: false
  })
  title?: string;

  @Column({
    allowNull: false
  })
  content?: string;

  @Column({
    allowNull: false,
    unique: true
  }) 
  slug?: string;

  @ForeignKey(()=>Category)
  @Column({
    allowNull: false
  })
  categoryId?: number;

  @ForeignKey(()=>User)
  @Column({
    allowNull: false,
  }) 
  userId?: number;

  @BelongsTo(()=>Category)
  category?: Category;

  @BelongsTo(()=>User)
  user?: User;

  @HasMany(()=>Comment)
  comments: Comment[] = []

  @BelongsToMany(()=>Tag, ()=>PostTag)
    tags: Tag[] = []
}
