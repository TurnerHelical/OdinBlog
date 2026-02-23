

async function root() {
    try {
        const res = await fetch('http://localhost:3001/posts');
        const posts = await res.json()
        return posts;

    } catch (error) {
        console.log('error');
    }

}
export { root };