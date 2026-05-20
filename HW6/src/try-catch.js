const fallbackUrl = 'https://jsonplaceholder.typicode.com/todos/1';
const getData = async url => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('bad response');
        return await res.json();
    } catch {
        const res = await fetch(fallbackUrl);
        if (!res.ok) throw new Error('fallback failed');
        return await res.json();
    }
};
getData('https://not-existing-service.example.com')
    .then(data => console.log(data.title || data))
    .catch(err => console.log(err.message));
