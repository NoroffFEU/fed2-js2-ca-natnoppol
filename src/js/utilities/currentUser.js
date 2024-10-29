export function getCurrentUser(){
    const token = localStorage.getItem('token')
    const user = JSON.parse (localStorage.getItem('user'))
    
    if (!token || !user) {
        throw new Error("User not authenticated");
      }
    return {token, user};
}
