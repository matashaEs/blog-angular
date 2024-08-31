import { Table, Model, Column, BelongsToMany } from "sequelize-typescript";
import { Post } from "./Post";
import { PostTag } from "./PostTag";

@Table
export class Tag extends Model<Tag>{

    @Column({
        allowNull: false
    })
    name?: string;

    @BelongsToMany(()=>Post, ()=>PostTag)
    posts: Post[] = []
}