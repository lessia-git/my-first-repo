import type { Post, User, Comment, PostWithUserAndComments } from './types';


async function fetchFromAPI<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
}


export async function getPostWithUserAndComments(postId: number): Promise<PostWithUserAndComments> {
    const post = await fetchFromAPI<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const user = await fetchFromAPI<User>(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const comments = await fetchFromAPI<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

    return {
        post,
        user,
        comments
    };
}
