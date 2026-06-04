"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostWithUserAndComments = getPostWithUserAndComments;
async function fetchFromAPI(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
}
async function getPostWithUserAndComments(postId) {
    const post = await fetchFromAPI(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const user = await fetchFromAPI(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const comments = await fetchFromAPI(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return {
        post,
        user,
        comments
    };
}
