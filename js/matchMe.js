const url = `https://api.thecatapi.com/v1/images/search?limit=10`;
const api_key = "live_3nJiUCYOflXjVBD58WkfkEbYTizGoxW0u2MkZozYL6XvySezM61cX4dggekfTQMP";

let startbtn = document.getElementById('startbtn');
let table = document.getElementById('table');
let timer = document.getElementById('timer');
let [seconds,minutes,hours] = [0,0,0];
btns = [];
isInvisible = [];
visiblebtns = [];
pairsCompleted = 0;

for(let i = 0; i < 20; i++){
    btns.push(document.getElementById(`btn${i}`));
    isInvisible.push(true);
}
console.log(isInvisible);
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

function updateTimer(){
    m = minutes < 10 ? "0" + minutes : minutes;
    s = seconds < 10 ? "0" + seconds : seconds;

    timer.innerHTML = `${m}:${s}`;
}

function Timer(){
    seconds++;
    if(seconds == 60){
        seconds = 0;
        minutes++;
    }
    updateTimer();
}

window.addEventListener('load', () => {
    fetchImages();
});

startbtn.addEventListener('click', ()=>{
    table.classList.remove('hide');
    startbtn.classList.add('hide');
    timer.classList.remove('hide');

    let time = setInterval(Timer, 1000)
    // Working of Buttons
    for (let i = 0; i < 20; i++) {
        btns[i].addEventListener('click', () => {
            // opening a card
            if (isInvisible[i] && (visiblebtns.length < 2)) {
                isInvisible[i] = false;
                btns[i].disabled = true;
                btns[i].classList.remove('invisible');

                visiblebtns.push(btns[i]);
                console.log(visiblebtns);

                if(visiblebtns.length == 2){
                    // check if correct pair
                    if(visiblebtns[0].style.backgroundImage == visiblebtns[1].style.backgroundImage){
                        visiblebtns[0].disabled = true;
                        visiblebtns[1].disabled = true;
                        visiblebtns[0].parentElement.classList.add('greenGlow');
                        visiblebtns[1].parentElement.classList.add('greenGlow');
                        visiblebtns = [];
                        pairsCompleted++;
                        if(pairsCompleted == 10){
                            clearInterval(time);
                        }
                    }
                    // incorrect pair
                    else{
                        let card0 = visiblebtns[0].parentElement;
                        let card1 = visiblebtns[1].parentElement;
                        card0.classList.add('redGlow');
                        card1.classList.add('redGlow');
                        int = setInterval(()=>{
                            isInvisible[btns.indexOf(visiblebtns[0])] = true;
                            isInvisible[btns.indexOf(visiblebtns[1])] = true;
                            visiblebtns[0].classList.add('invisible');
                            visiblebtns[1].classList.add('invisible');
                            visiblebtns[0].disabled = false;
                            visiblebtns[1].disabled = false;
                            card0.classList.remove('redGlow');
                            card1.classList.remove('redGlow');
                            visiblebtns = [];
                            clearInterval(int);
                        }, 2000);
                    }
                    console.log(visiblebtns);
                }
            }
            // closing a card
            else {
                isInvisible[i] = true;
                visiblebtns = [];
                btns[i].classList.add('invisible');
            }
        });
    }
});