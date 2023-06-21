<<<<<<< HEAD:js/guess_the_breed.js
// Function to fetch a random breed from the Cat API
async function fetchRandomCatBreed() {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

// Function to fetch an image associated with the given breed
async function fetchBreedImage(breedId) {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
  const data = await response.json();
  return data[0].url;
}

// Function to load a random cat breed image and generate breed options
async function loadRandomCatBreedImageAndOptions() {
  const catImage = document.getElementById('catImage');
  const breedOptions = document.getElementById('breedOptions');
  const resultText = document.getElementById('resultText');
  resultText.textContent = '';

  // Fetch a random cat breed
  const breed = await fetchRandomCatBreed();

  // Load the cat breed image
  const imageUrl = await fetchBreedImage(breed.id);
  catImage.src = imageUrl;

  // Generate four random breed options
  const allBreeds = await fetchAllCatBreeds();
  const randomBreeds = getRandomBreeds(allBreeds, breed.id, 3);
  randomBreeds.push(breed.id);
  randomBreeds.sort(() => Math.random() - 0.5);

  // Display the breed options
  breedOptions.innerHTML = '';
  randomBreeds.forEach((breedId) => {
    const option = document.createElement('button');
    option.classList.add('button-option');
    option.textContent = allBreeds[breedId].name;
    option.addEventListener('click', () => checkAnswer(breedId, breed.id, resultText, option));
    breedOptions.appendChild(option);
  });
}

// Event listener for breedOptions click
document.getElementById('breedOptions').addEventListener('click', () => {
  document.getElementById('breedOptions').classList.add('stylingOption');
});

// Function to fetch all cat breeds from the Cat API
async function fetchAllCatBreeds() {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  const data = await response.json();
  const breeds = {};
  data.forEach((breed) => {
    breeds[breed.id] = breed;
  });
  return breeds;
}

// Function to get an array of random breed IDs
function getRandomBreeds(allBreeds, correctBreedId, count) {
  const breedIds = Object.keys(allBreeds);
  breedIds.splice(breedIds.indexOf(correctBreedId), 1);
  const randomBreeds = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * breedIds.length);
    randomBreeds.push(breedIds[randomIndex]);
    breedIds.splice(randomIndex, 1);
  }
  return randomBreeds;
}

// Function to check the user's answer
function checkAnswer(selectedBreedId, correctBreedId, resultText, breedOptions) {
  if (selectedBreedId === correctBreedId) {
    resultText.textContent = 'Correct!';
    resultText.classList.add('correct');
    if (breedOptions) {
      breedOptions.classList.add('correctOption');
    }
  } else {
    resultText.textContent = `Wrong! Try again. Correct answer hint: ${correctBreedId}`;
    resultText.classList.remove('correct');
    if (breedOptions) {
      breedOptions.classList.add('wrongOption');
    }
  }
}

// Function to load a new random cat breed image and options
function loadNewCat() {
  loadRandomCatBreedImageAndOptions();
}

// On page load, load a random cat breed image and options
window.addEventListener('load', () => {
  loadRandomCatBreedImageAndOptions();
});

// Event listener for the "New Cat" button
const newCatButton = document.getElementById('newCatButton');
newCatButton.addEventListener('click', loadNewCat);

=======
async function fetchRandomCatBreed() {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

async function fetchBreedImage(breedId) {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
  const data = await response.json();
  return data[0].url;
}

async function loadRandomCatBreedImageAndOptions() {
  const catImage = document.getElementById('catImage');
  const breedOptions = document.getElementById('breedOptions');
  const resultText = document.getElementById('resultText');
  resultText.textContent = '';

const breed = await fetchRandomCatBreed();

const imageUrl = await fetchBreedImage(breed.id);
catImage.src = imageUrl;

const allBreeds = await fetchAllCatBreeds();
const randomBreeds = getRandomBreeds(allBreeds, breed.id, 3);
randomBreeds.push(breed.id);
randomBreeds.sort(() => Math.random() - 0.5);

breedOptions.innerHTML = '';
randomBreeds.forEach((breedId) => {
    const option = document.createElement('button');
    option.classList.add('button-option');
    option.textContent = allBreeds[breedId].name;
    option.addEventListener('click', () => checkAnswer(breedId, breed.id, resultText, option));
    breedOptions.appendChild(option);
  });
}

document.getElementById('breedOptions').addEventListener('click', () => {
  document.getElementById('breedOptions').classList.add('stylingOption');
});

async function fetchAllCatBreeds() {
  const response = await fetch('https://api.thecatapi.com/v1/breeds');
  const data = await response.json();
  const breeds = {};
  data.forEach((breed) => {
    breeds[breed.id] = breed;
  });
  return breeds;
}

function getRandomBreeds(allBreeds, correctBreedId, count) {
  const breedIds = Object.keys(allBreeds);
  breedIds.splice(breedIds.indexOf(correctBreedId), 1);
  const randomBreeds = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * breedIds.length);
    randomBreeds.push(breedIds[randomIndex]);
    breedIds.splice(randomIndex, 1);
  }
  return randomBreeds;
}

function checkAnswer(selectedBreedId, correctBreedId, resultText, breedOptions) {
  if (selectedBreedId === correctBreedId) {
    resultText.textContent = 'Correct!';
    resultText.classList.add('correct');
    if (breedOptions) {
      breedOptions.classList.add('correctOption');
    }
  } else {
    resultText.textContent = `Wrong! Try again. Correct answer hint: ${correctBreedId}`;
    resultText.classList.remove('correct');
    if (breedOptions) {
      breedOptions.classList.add('wrongOption');
    }
  }
}

function loadNewCat() {
  loadRandomCatBreedImageAndOptions();
}

window.addEventListener('load', () => {
  loadRandomCatBreedImageAndOptions();
});

const newCatButton = document.getElementById('newCatButton');
newCatButton.addEventListener('click', loadNewCat);

>>>>>>> a1f9b8e630334a00a555eef05901d993db245a1f:guess_the_breed/main.js
