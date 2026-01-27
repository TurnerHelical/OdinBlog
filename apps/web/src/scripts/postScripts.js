

export async function getPosts() {
    const res = await fetch("http://localhost:3001/posts");
    return res.json();
};