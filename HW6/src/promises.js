const useJson = data => data.title || data;
const fetchJson = url => fetch(url)
    .then(res => res.json())
    .then(useJson)
    .then(result => console.log(result));
fetchJson('https://jsonplaceholder.typicode.com/todos/1');
fetchJson('https://jsonplaceholder.typicode.com/posts/1');
