const url = `https://api.thecatapi.com/v1/images/search?limit=20`;
const api_key = "live_3nJiUCYOflXjVBD58WkfkEbYTizGoxW0u2MkZozYL6XvySezM61cX4dggekfTQMP";

async function fetchImages() {
    const response = await fetch(url, {
        headers: { 'x-api-key': api_key }
    })
    const data = await response.json();
    
    for(let i = 0; i < 20; i++){
        btns[i].style.backgroundImage = `url(${data[i].url})`;
    }
}

window.addEventListener('load', () => {
    fetchImages();
});



// Working of Buttons
let btns = [];
for (let i = 0; i < 20; i++) {
    btns.push(document.getElementById(`btn${i}`));
    let isInvisible = false;
    btns[i].addEventListener('click', () => {
        if (isInvisible) {
            isInvisible = false;
            btns[i].classList.remove('invisible');
        }
        else {
            isInvisible = true;
            btns[i].classList.add('invisible');
        }
    });
}

