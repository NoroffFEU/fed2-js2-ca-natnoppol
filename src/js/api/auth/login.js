export async function login({ email, password }) {
    const body = JSON.stringify({ email, password});

        const response = await fetch (API_AUTH_LOGIN, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body,
        });
        
        if (response.ok){
            const {data} = await response.json();
            const { accessToken: token, ...user} = data;
            localStorage.token = token;
            localStorage.user = JSON.stringify(user);
            return data;
        }
}
