

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostWithUserAndComments {
    post: Post;
    user: User;
    comments: Comment[];
}
