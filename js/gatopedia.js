function searchCat() {
    var searchTerm = document.getElementById("searchInput").value;
    //just ignore the below bits still working on that!

    /*// Check if the search term already ends with "cat"
    if (!searchTerm.toLowerCase().endsWith("cat")) {
        searchTerm += " cat"; // Append " cat" to the search term
    }*/

    // URL encode the search term for the random bits 
    var encodedSearchTerm = encodeURIComponent(searchTerm);
    
    var url = "https://en.wikipedia.org/w/api.php";
    url += "?action=query";
    url += "&format=json";
    url += "&prop=extracts";
    url += "&exlimit=max"; // Fetchhin the full article
    // also can delete the next line if needed
    /*url += "&explaintext";*/
    url += "&titles=" + encodedSearchTerm;
    url += "&callback=displayCatInfo";
    
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

//display functn
function displayCatInfo(data) {
    var pages = data.query.pages;
    var pageId = Object.keys(pages)[0];
    var extract = pages[pageId].extract;
    var resultElement = document.getElementById("result");
    resultElement.innerHTML = extract;
    resultElement.classList.add("preserve-formatting");
}






