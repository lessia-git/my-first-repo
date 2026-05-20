const useJson = data => data.title || data;
const fetchJson = async url => {
    const res = await fetch(url);
    const data = await res.json();
    return useJson(data);
};
fetchJson('https://jsonplaceholder.typicode.com/todos/1').then(console.log);
fetchJson('https://jsonplaceholder.typicode.com/posts/1').then(console.log);
