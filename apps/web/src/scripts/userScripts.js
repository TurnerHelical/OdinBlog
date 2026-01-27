export async function userLogin() {
    fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'test@gmail.com',
            password: 'password',
        })
    })
}