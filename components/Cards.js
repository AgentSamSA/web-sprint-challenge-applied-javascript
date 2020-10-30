// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

function makeArticleCard(articleObj) {
    const card = document.createElement("div");
    const articleHeadline = document.createElement("div");
    const author = document.createElement("div");
    const imageContainer = document.createElement("div");
    const authorImage = document.createElement("img");
    const authorName = document.createElement("span");

    card.classList.add("card");
    articleHeadline.classList.add("headline");
    author.classList.add("author");
    imageContainer.classList.add("img-container");

    card.appendChild(articleHeadline);
    card.appendChild(author);
    author.appendChild(imageContainer);
    author.appendChild(authorName);
    imageContainer.appendChild(authorImage);

    articleHeadline.textContent = articleObj.headline;
    authorImage.setAttribute("src", articleObj.authorPhoto);
    authorName.textContent = "By " + articleObj.authorName;

    card.addEventListener("click", () => console.log(articleObj.headline));

    return card;
}

axios
    .get("https://lambda-times-api.herokuapp.com/articles")
    .then(res => {
        //console.log(res);
        //console.log(res.data);
        const tabs = document.querySelectorAll(".tab");
        const articlesObj = res.data.articles;
        for (let articleTopic in articlesObj) {
            articlesObj[articleTopic].forEach(article => {
                const card = makeArticleCard(article);
                document.querySelector(".cards-container").appendChild(card);
                card.classList.add(articleTopic);
            });
        }
        const cards = document.querySelectorAll(".card");
        tabs.forEach(tab => {
            tab.addEventListener("click", (event) => {
                tab.classList.toggle("active-tab");
                console.log(event.target.textContent);
                cards.forEach(card => {
                    if (!card.classList.contains(event.target.textContent)) {
                        card.style.display = "none";
                    } else {
                        card.style.display = "block";
                    }
                });
            });
        });
    })
    .catch(error => {
        console.log("Error", error);
        const errorMessage = document.createElement("h1");
        errorMessage.textContent = "Failed to retrieved articles! Check console (Right-click -> Inspect -> Console tab) for details";
        document.querySelector(".errors-container").appendChild(errorMessage);
    });