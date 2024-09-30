export interface UserInterface {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'pending';
    createdAt: string;
    updatedAt: string;
}