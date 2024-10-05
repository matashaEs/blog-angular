import { Table, Model, ForeignKey, Column, BelongsTo } from "sequelize-typescript";
import { Post } from "./Post";
import { Tag } from "./Tag"; 

 @Table
 export class PostTag extends Model<PostTag>{
    @ForeignKey(()=>Post)
    @Column({
        allowNull: false
    })
    postId?: number

    @ForeignKey(()=>Tag)
    @Column({
        allowNull: false
    })
    tagId?: number

    @BelongsTo(()=>Post)
    post?: Post

    @BelongsTo(()=>Tag)
    tag?: Tag
 }
 