const accessKey = "kjkslzPtjeoG8skz2RVhOHrE9e3hfmYb_QWTtsg4IuI";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

// Initially hide the "Show More" button
showMore.style.display = "none";

let inputData = "";
let page = 1;

// Fetch and display images
async function fetchImages() {
  inputData = inputEl.value;

  if (!inputData.trim()) {
    alert("Please enter a search term!");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    displayResults(data.results);

    // Increment page for next search
    page++;
    if (page > 1) showMore.style.display = "block"; // Show "Show More" button after search
  } catch (error) {
    console.error("Error fetching images:", error);
    searchResults.innerHTML = `<p>Something went wrong: ${error.message}</p>`;
  }
}

// Display search results
function displayResults(results) {
  if (page === 1) searchResults.innerHTML = "";

  if (results.length === 0) {
    searchResults.innerHTML = "<p>No results found. Try another search term!</p>";
    showMore.style.display = "none";
    return;
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description || "Image";

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description || "View Image";

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
}

// Event Listeners
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  fetchImages();
});

showMore.addEventListener("click", handleShowMore);

// Separate function for Show More button
function handleShowMore() {
  fetchImages();
}
