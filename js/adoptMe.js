const apiKey = 'live_15r9tqD7181iOJiLITeBYiW0WRVHunOVJLhxN73ylrqtmTKiCC52pl3jsGAqqS3n';
const characteristicInput = document.getElementById('characteristic');
const findCatButton = document.getElementById('findCatButton');

// Function to fetch cat data based on user characteristics
async function fetchCatsByCharacteristic(characteristic) {
    const response = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`); // fetch data for all breeds
    data = await response.json();

    // first, filter out those breeds which do not have image
    data = data.filter(img => img.image?.url != null);
    // filter out those breeds which have the selected characteristic
    const matchedBreeds = data.filter(breed => {
        // temperament property contains the list of characteristics of the breed, separated by commas
        const listOfCharacteristics =  breed.temperament.split(', ');
        if(listOfCharacteristics.includes(characteristic)) return breed;
    });
    return matchedBreeds;
}

async function displayInfo(cats){
    console.log(cats);
    
    for(let id = 0; id < cats.length; id++){
        // creating a card
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', `${id}`);
        // Child elements
        let h1 = document.createElement('h1');
        h1.setAttribute('id', `breed${id}`);
        h1.innerHTML = cats[id].name;
        card.appendChild(h1);

        let img = document.createElement('img');
        img.setAttribute('id', `image${id}`);
        img.setAttribute('src', cats[id].image.url);
        card.appendChild(img);

        let country = document.createElement('p');
        country.setAttribute('id', `characteristics${id}`);
        country.innerHTML = `Country of Origin: ${cats[id].origin}`;
        card.appendChild(country);

        let characteristics = document.createElement('p');
        characteristics.setAttribute('id', `characteristics${id}`);
        characteristics.innerHTML = cats[id].temperament;
        card.appendChild(characteristics);

        let description = document.createElement('p');
        description.setAttribute('id', `description${id}`);
        description.innerHTML = cats[id].description;
        card.appendChild(description);

        let wiki = document.createElement('a');
        let btn = document.createElement('button');
        btn.innerHTML = 'Learn More';
        wiki.href = cats[id].wikipedia_url;
        wiki.setAttribute('target', '_blank');
        wiki.appendChild(btn);
        card.appendChild(wiki);

        document.getElementById('catResultContainer').appendChild(card);
    }
}

// Event listener for the "Find My Cat" button
findCatButton.addEventListener('click', async () => {
    document.getElementById('catResultContainer').innerHTML = '';
    const characteristic = characteristicInput.value;
    if (characteristic !== '') {
        const cats = await fetchCatsByCharacteristic(characteristic);
        if(cats.length !== 0) displayInfo(cats);
        else document.getElementById('sorry').classList.remove('hide');
    }
});