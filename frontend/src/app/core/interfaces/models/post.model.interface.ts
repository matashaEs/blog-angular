import { CategoryInterface } from "./category.model.interface";
import { UserInterface } from "./user.interface";


export interface PostInterface {
    id: number;
    title: string;
    content: string;
    slug: string;
    userId: string;
    user: UserInterface;
    categoryId: number;
    category: CategoryInterface;
    createdAt: string;
    updatedAt: string;
}
