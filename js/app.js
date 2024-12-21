const apiKey = '47b78e2ce7ce4831b755130e953f4121'; // Make sure your API key is kept secure

// Using "blog-container" as the ID for the container
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        // Corrected the URL by using backticks for template literals
        const apiURL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=9&apikey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random News", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching News for query", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        // Corrected the URL by using backticks for template literals
        const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=9&apikey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching News for query", error);
        return [];
    }
}

function displayBlogs(articles) {
    // Using "blogContainer" to clear the content of the container
    blogContainer.innerHTML = "";

    articles.forEach((article) => {
        const blogCard = document.createElement("div");  // Fixed typo here (blogCArd -> blogCard)
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;  // Fixed typo: 'text' to 'title'

        const description = document.createElement("p");  // Fixed typo: 'desctription' to 'description'
        description.textContent = article.description;  // Fixed typo: 'desctription' to 'description'

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);  // Append the blog card to the blogContainer
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });
    });
}

// Immediately invoked function expression (IIFE)
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);  // Display the articles in the blogContainer
    } catch (error) {
        console.error("Error fetching random News", error);
    }
})();
