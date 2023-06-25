const apiKey = 'live_15r9tqD7181iOJiLITeBYiW0WRVHunOVJLhxN73ylrqtmTKiCC52pl3jsGAqqS3n';
const characteristicsInput = document.getElementById('characteristics');
const findCatButton = document.getElementById('findCatButton');
const catBreed = document.getElementById('catBreed');
const catCharacteristics = document.getElementById('catCharacteristics');
const catImage = document.getElementById('catImage');

// Function to fetch cat data based on user characteristics
async function fetchCatByCharacteristics(characteristics) {
  const response = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`);
  const data = await response.json();

  const matchedBreeds = data.filter(breed => {
    const breedCharacteristics = breed.description.toLowerCase();
    return characteristics.toLowerCase().split(',').every(char => breedCharacteristics.includes(char.trim()));
  });

  if (matchedBreeds.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchedBreeds.length);
    return matchedBreeds[randomIndex];
  } else {
    return null;
  }
}

// Function to display cat information
function displayCatInfo(cat) {
  if (cat) {
    catBreed.textContent = cat.name;
    catCharacteristics.textContent = cat.description;
    catImage.src = `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`;
    catImage.alt = cat.name;
    catImage.style.display = 'block';
    catResultContainer.classList.add('special'); // Add the special class to the card
  }

  else {
    catBreed.textContent = 'No Match Found';
    catCharacteristics.textContent = 'Sorry, we could not find a cat breed matching your characteristics.';
    catImage.src = '';
    catImage.alt = '';
    catImage.style.display = 'none';
    catResultContainer.classList.remove('special'); // Remove the special class from the card
  }
}


// Event listener for the "Find My Cat" button
findCatButton.addEventListener('click', async () => {
  const characteristics = characteristicsInput.value.trim();
  if (characteristics !== '') {
    const cat = await fetchCatByCharacteristics(characteristics);
    displayCatInfo(cat);

    // const element = document.getElementById('catResultContainer');
    // html2canvas(element).then(function(canvas){
    //   document.getElementById('result').append(canvas);

    //   let cvs = document.querySelector('canvas');
    //   let downloadLink = document.getElementById('download-page-as-image');

    //   downloadLink.href = cvs.toDataURL();
    //   downloadLink.download = 'fileName.png';
    // });
  }
});
