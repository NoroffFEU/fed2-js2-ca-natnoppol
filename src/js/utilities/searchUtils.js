export function handleSearchInput(event){
    if (event.key === 'enter'){
        const query = event.target.value.trim();
        if(query){
            redirectTosearch(query);
        }
    }
}

function redirectTosearch(query){
    const searchUrl = `/search/post/?q=${encodeURIComponent(query)}`
    window.location.href = searchUrl;
}