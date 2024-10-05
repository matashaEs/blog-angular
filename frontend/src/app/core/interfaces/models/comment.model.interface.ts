import { UserInterface } from "./user.interface";

export interface CommentInterface {
    id: number;
    postId: number;
    content: string;
    userId: number;
    user: UserInterface;
    createdAt: string;
    updatedAt: string;
}
