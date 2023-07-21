const accesskey = 'T-rwW4RKFKSJ4sTJzS0O8wSh7U99m-dn_LeukOsMD9I';

const form1 = document.querySelector("form");
const input1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = " ";
let page = 1;

async function searchImages(){
    inputData = input1.value;
    const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(URL);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }
    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });
    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

form1.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", ()=>{
    searchImages();
})