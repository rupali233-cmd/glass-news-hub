const apiKey = "9ed2bca5f0ef4cd6821c1abde0eb979b";   // put your NewsAPI key here

const newsContainer = document.getElementById("news-container");

/* FETCH NEWS BY CATEGORY */

async function fetchNews(category = "general") {

try{

const url =
`https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${apiKey}`;

const response = await fetch(url);

const data = await response.json();

console.log(data);

displayNews(data.articles);

}catch(error){

console.error(error);

}

}

/* DISPLAY NEWS */

function displayNews(articles){

newsContainer.innerHTML="";

if(!articles || articles.length===0){

newsContainer.innerHTML="<h2>No news available for this category</h2>";
return;

}

articles.forEach(article=>{

const card=document.createElement("div");

card.classList.add("news-card");

card.innerHTML=`

<img src="${article.urlToImage || 'https://via.placeholder.com/300'}">

<h3>${article.title}</h3>

<p>${article.description || "No description available"}</p>

<a href="${article.url}" target="_blank">Read More</a>

`;

newsContainer.appendChild(card);

});

}

/* SEARCH */

async function searchNews() {

    const query = document.getElementById("searchInput").value;

    const url =
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    displayNews(data.articles);
}

/* BOOKMARK */

function bookmark(title) {

    let bookmarks =
    JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks.push(title);

    localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
    );

    alert("News Bookmarked!");
}

/* VOICE NEWS */

function speakNews(text) {

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speechSynthesis.speak(speech);
}

/* LOAD DEFAULT NEWS */

fetchNews("general");
/* TOGGLE CHATBOT */

function toggleChat(){

const chat=document.getElementById("chatbot");

chat.style.display =
chat.style.display === "flex" ? "none" : "flex";

}


/* SEND MESSAGE */

function sendMessage(){

const input=document.getElementById("chat-input");

const message=input.value.toLowerCase();

addMessage("You: " + message);

input.value="";

botReply(message);

}


/* ADD MESSAGE */

function addMessage(text){

const chatBody=document.getElementById("chat-body");

const msg=document.createElement("p");

msg.textContent=text;

chatBody.appendChild(msg);

chatBody.scrollTop=chatBody.scrollHeight;

}


/* BOT REPLIES */

function botReply(message){

let reply="I didn't understand.";

if(message.includes("technology")){

fetchNews("technology");

reply="Showing technology news.";

}

else if(message.includes("sports")){

fetchNews("sports");

reply="Here are sports news.";

}

else if(message.includes("business")){

fetchNews("business");

reply="Showing business news.";

}

else if(message.includes("health")){

fetchNews("health");

reply="Here is health news.";

}

else if(message.includes("creator")){

reply="This website was created by Rupali Bhardwaj.";

}

else if(message.includes("search")){

reply="Use the search bar to search news.";

}

addMessage("Bot: " + reply);

}