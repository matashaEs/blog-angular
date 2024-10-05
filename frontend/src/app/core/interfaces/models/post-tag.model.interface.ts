import { PostInterface } from "./post.model.interface";
import { TagInterface } from "./tag.model.interface";

export interface PostTagInterface {
    postId: number;
    tagId: number;
    post: PostInterface;
    tag: TagInterface;
    createdAt: string;
    updatedAt: string;
}
