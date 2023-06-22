const url = `https://api.thecatapi.com/v1/images/search?limit=10`;
const api_key = "live_3nJiUCYOflXjVBD58WkfkEbYTizGoxW0u2MkZozYL6XvySezM61cX4dggekfTQMP";

// function to shuffle an array
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) {
    while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
  }
  return array;
}
// Shuffled array of numbers from 0 to 19
let arr = [];
for (let i = 0; i < 20; i++) arr[i]=i;
arr = shuffle(arr);

// Funtion to fetch 10 images and arrange them as needed
async function fetchImages() {
    const response = await fetch(url, {
        headers: { 'x-api-key': api_key }
    })
    const data = await response.json();
    
    for(let i = 0; i < 10; i++){
        btns[arr[i]].style.backgroundImage = `url(${data[i].url})`;
        btns[arr[i+10]].style.backgroundImage = `url(${data[i].url})`;
    }
}

window.addEventListener('load', () => {
    fetchImages();
    console.log(arr);
});



// Working of Buttons
let btns = [];
visiblebtns = [];
for (let i = 0; i < 20; i++) {
    btns.push(document.getElementById(`btn${i}`));
    let isInvisible = false;
    btns[i].addEventListener('click', () => {
        // opening a card
        if (isInvisible && (visiblebtns.length < 2)) {
            isInvisible = false;
            btns[i].classList.remove('invisible');

            visiblebtns.push(btns[i]);
            console.log(visiblebtns);

            if(visiblebtns.length == 2){
                // check if correct pair
                if(visiblebtns[0].style.backgroundImage == visiblebtns[1].style.backgroundImage){
                    visiblebtns[0].disabled = true;
                    visiblebtns[1].disabled = true;
                    visiblebtns = [];
                    
                }
                // incorrect pair
                else{
                    int = setInterval(()=>{
                        visiblebtns[0].classList.add('invisible');
                        visiblebtns[1].classList.add('invisible');
                        visiblebtns = [];
                        clearInterval(int);
                    }, 2000);
                }
                console.log(visiblebtns);
            }
        }
        // closing a card
        else {
            isInvisible = true;
            btns[i].classList.add('invisible');
            
        }
    });
}

