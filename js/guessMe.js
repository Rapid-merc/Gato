const newCatButton = document.getElementById('newCatButton');
newCatButton.innerHTML = 'Skip';
newCatButton.addEventListener('click', loadRandomCatBreedImageAndOptions);

window.addEventListener('load', () => {
  loadRandomCatBreedImageAndOptions();
});

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
  newCatButton.innerHTML = 'Skip';

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
    breedOptions.appendChild(option);
    option.addEventListener('click', () => checkAnswer(breedId, breed.id, resultText, option));
  });
}

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
    newCatButton.innerHTML = 'New Cat';
    if (breedOptions) {
      breedOptions.classList.add('correctOption');
    }
  } 
  else {
    resultText.textContent = `Wrong! Try again. Correct answer hint: ${correctBreedId}`;
    resultText.classList.remove('correct');
    if (breedOptions) {
      breedOptions.classList.add('wrongOption');
    }
  }
}