const url = 'https://api.thecatapi.com/v1/breeds';
const api_key = "live_3nJiUCYOflXjVBD58WkfkEbYTizGoxW0u2MkZozYL6XvySezM61cX4dggekfTQMP";
let storedBreeds = []

window.addEventListener('load', ()=>{
    fetchBreeds();
});

async function fetchBreeds() {
    const response = await fetch(url, {
        headers: { 'x-api-key': api_key }
    })
    const data = await response.json();
    
    storedBreeds = data.filter(img => img.image?.url != null)
    for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        let option = document.createElement('option');
         
        //skip any breeds that don't have an image
        if(!breed.image)continue
         
        //use the current array index
        option.value = i;
        option.innerHTML = `${breed.name}`;
        document.getElementById('breed_selector').appendChild(option);
    }
    showBreedImage(0);
}

function showBreedImage(index){ 
  document.getElementById("breed_image").src= storedBreeds[index].image.url;
}