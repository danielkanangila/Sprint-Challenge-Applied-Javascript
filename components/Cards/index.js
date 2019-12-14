// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.
(function() {
    const html = String.raw;
    const base_url = 'https://lambda-times-backend.herokuapp.com/articles';
    const parser = new DOMParser();

    async function fetchData() {
        try {
            return await axios.get(base_url);
        } catch (err) {
            console.error(err);
        }
    }

    function Card({topic, headline, authorPhoto, authorName}) {
        const template = html`
            <div class="card" data-tab-content="${topic}">
               <div class="headline">${headline}</div>
               <div class="author">
                 <div class="img-container">
                   <img src=${authorPhoto} />
                 </div>
                 <span>By ${authorName}</span>
               </div>
            </div>
        `

        return parser.parseFromString(template, 'text/html')
            .body.firstChild;
    }

    async function addCardToDOM() {
        const articles = await fetchData();
        const articlesContainer = document.querySelector('.cards-container');
        for (let [key, value] of Object.entries(articles.data.articles)) {
            value.forEach(
                article => articlesContainer.appendChild(Card({topic: key, ...article}))
            );
        }
    }

    addCardToDOM();
})();