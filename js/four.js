const apikey = "live_3nJiUCYOflXjVBD58WkfkEbYTizGoxW0u2MkZozYL6XvySezM61cX4dggekfTQMP";

randomimage = document.getElementById('randomImage');

async function fetchImage() {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?`, {
        headers: { 'x-api-key': apikey }
    })
    const data = await response.json();

    randomimage.src = data[0].url;
}

window.addEventListener('load', ()=>{fetchImage()});