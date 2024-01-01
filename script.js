

const API_Key = '62af842b66714698997183efb6dbbb64';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', ()=> fetchNews("India"));

async function fetchNews(query) {
   const response = await fetch(`${url}${query}&apiKey=${API_Key}`);
    const data = await response.json();
    // .then((data) => console.log(data))
    // console.log(response);
    console.log(data)
    bindData(data.articles);
}
function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsTempelate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';
    articles.forEach((article) =>{
        if(!article.urlToImage) return;
    // .content is used to copy only the content  present in the Tempelate section 
        const cardClone = newsTempelate.content.cloneNode(true);

        fillData(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillData(cardClone, article){
    let newsImg = cardClone.getElementById('news-img');
    let newsTitle = cardClone.getElementById('news-title');
    let newsSource = cardClone.getElementById('news-source');
    let newsDesc = cardClone.getElementById('news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click',() =>{
    const newsInput = document.querySelector('.news-input');
    const inputValue = newsInput.value; 
    fetchNews(inputValue);
    curSelectedNav.classList.remove('active');
    
})