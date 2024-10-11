const mainBox = document.querySelector("#main");
const nav = document.querySelector("nav");
if (nav) {
  mainBox.addEventListener("wheel", () => {
    if (nav.classList.contains("bg-slate-900")) {
      nav.classList.replace("bg-slate-900", "bg-slate-900/50");
    }
  });
}

const apiKey = "41827f0597f94d04bbbae1404a992153";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
  fetchNews("India");
});

async function fetchNews(query) {
  const startDate = "2024-09-01";
  const res = await fetch(
    `${url}${query}&from=$&sortBy=publishedAt&apiKey=${apiKey}`
  );
  const data = await res.json();
  bindData(data.articles);
}

function formatTimestamp(isoTimestamp) {
  const date = new Date(isoTimestamp);

  return date.toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
}
function bindData(articles) {
  let container = document.querySelector(".container");
  let newsCard = document.querySelector(".news-card");
  container.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    else {
      let cardClone = newsCard.content.cloneNode(true);
      addingDataInCard(cardClone, article);
      container.appendChild(cardClone);
    }
  });
}

function addingDataInCard(cardClone, article) {
  let image = cardClone.querySelector(".card-image");
  image.setAttribute("src", article.urlToImage);

  let cardTitle = cardClone.querySelector(".card-title");
  cardTitle.innerText = article.title;

  let cardInfo = cardClone.querySelector(".card-info");
  cardInfo.innerText = `${article.source.name}- ${formatTimestamp(
    article.publishedAt
  )}`;

  let newsText = cardClone.querySelector(".news-para");
  newsText.innerText = article.description;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let items = document.querySelector(".items");
var previousElement = null;

function checkClass(currentId) {
  const currentElement = document.getElementById(currentId);

  if (previousElement && previousElement !== currentElement) {
    previousElement.classList.remove("highlight");
    previousElement.classList.remove("border-b-2");
    previousElement.classList.remove("border-sky-400");
  }

  currentElement.classList.add("highlight");
  currentElement.classList.add("border-b-2");
  currentElement.classList.add("border-sky-400");

  previousElement = currentElement;
}

let searchText = document.getElementById("searchbar");
let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  let query = searchText.value;
  if (!query) return;
  fetchNews(query);
  let allItems = document.querySelectorAll(".items p");
  allItems.forEach((item) => {
    item.classList.remove("highlight");
    item.classList.remove("border-b-2");
    item.classList.remove("border-sky-400");
  });
});

function reload() {
  window.location.reload();
}

