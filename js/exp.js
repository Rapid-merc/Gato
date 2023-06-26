const url = `https://api.thecatapi.com/v1/images/search`;
const api_key = "live_3nJiUCYOflXjVBD58WkfkEbYTizGoxW0u2MkZozYL6XvySezM61cX4dggekfTQMP";

async function fetchImages() {
    const response = await fetch(url, {
        headers: { 'x-api-key': api_key,}
    })
    const data = await response.json();
    
    let imageURL = data[0].url;
    document.getElementById('image').src = imageURL;
}

fetchImages();

int = setInterval(()=>{
    const element = document.getElementById('container');
    html2canvas(element, { useCORS: true, allowTaint: true, onrendered: function (canvas) {
        document.getElementById('result').append(canvas);

        let cvs = document.querySelector('canvas');
        let downloadLink = document.getElementById('download');

        downloadLink.href = cvs.toDataURL();
        downloadLink.download = 'fileName.png';
        clearInterval(int);
        }
    })
}, 5000);
