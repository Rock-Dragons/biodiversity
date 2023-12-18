const actualPage = "news";

var newsDataArr = []

document.addEventListener("DOMContentLoaded", function() {


const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetalies = document.getElementById("newsdetalies");

const API_KEY = "1d70c3dd3ec744d98d900ab6d6b33864"
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload= function(){
    newsType.innerHTML="<h4 class='section-header' >Headlines</h4>"
    fetchHeadlines()

}

const fetchHeadlines = async () =>{
    const response = await fetch(SEARCH_NEWS + "biodiversity" + "&apiKey=" + API_KEY);

    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson)

        newsDataArr = myJson.articles
    } else {
        console.log(response.status, response.statusText)
    }

    displayNews()
}

const fetchQueryNews = async () => {
    if(newsQuery.value == null){
        return;
    }

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = []
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json()
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText)
        newsDetalies.innerHTML = "<h5>No data Found</h5>";
        return
    }

    displayNews()
}

searchBtn.addEventListener("click", function(){
    console.log("clicked")
    newsType.innerHTML="<h4 class='section-header'>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});



function displayNews(){
    console.log('newsDataArr in displayNews:', newsDataArr); // Verificare newsDataArr
    console.log('newsDetalies:', newsDetalies); // Verificare newsDetalies
    
    newsDetalies.innerHTML = "";
    
    if(newsDataArr.length == 0){
        newsDetalies.innerHTML = "<h5>No data found</h5>"
        return
    }
    
    

    newsDataArr.forEach(news => {
        var date = news.publishedAt.split("T")
        
        var col = document.createElement("div")
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card" ;
        
        var card = document.createElement("div")
        card.className="p-2" ;
        
        var image = document.createElement("img")
        image.setAttribute("height", "matchparent")
        image.setAttribute("width", "100%")
        image.src=news.urlToImage
        
        var cardBody = document.createElement("div")
        
        var newsHeading = document.createElement("h5")
        newsHeading.className= "card-title"
        newsHeading.innerHTML = news.title
        
        var dateHeading = document.createElement("h6")
        dateHeading.className = "text-primary"
        dateHeading.innerHTML = date[0]

        var discription = document.createElement("p")
        discription.className="text-muted"
        discription.innerHTML = news.description
        var link = document.createElement("a")
        link.className = "btn btn-dark"
        link.setAttribute("target", "_blank")
        link.href = news.url
        link.innerHTML = "Read more"
        
        cardBody.appendChild(newsHeading)
        cardBody.appendChild(dateHeading)
        cardBody.appendChild(discription)
        cardBody.appendChild(link)
        
        
        card.appendChild(image)
        card.appendChild(cardBody)
        
        col.appendChild(card)
        
        newsDetalies.appendChild(col)

        
    })
    
}
})