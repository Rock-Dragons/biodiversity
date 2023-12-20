//Constant used for Navbar State Machine
const actualPage = "news";


//News HTML Container
var newsDetalies;

//Array with data got from API Call
var newsDataArr = [];

//HTML 'Search News' Text Field 
var newsQuery;

//Super Secret API Key
const API_KEY = "1d70c3dd3ec744d98d900ab6d6b33864"
//API Link for the Headlines
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=us&pageSize=20&category=science&apiKey=";
//API Link for User Queries
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=biodiversity&pageSize=20";

//Execute the code when the webpage is loaded
document.addEventListener("DOMContentLoaded", function() {

    //Page Header - the value will be change when the search box is used
    const newsHeader = document.getElementById("newsType");


    newsQuery = document.getElementById("newsQuery");
    newsDetalies = document.getElementById("newsdetalies");

    //Create the Page Header
    newsHeader.innerHTML="<h4 class='section-header' >Headlines</h4>"

    //Get and Display the data for Headlines
    fetchHeadlines();

    //When the search Button is pressed, get and display the data filtered
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", function(){
        //Update the Headline with the User Input
        newsHeader.innerHTML="<h4 class='section-header'>Search : "+newsQuery.value+"</h4>";
        //Get and Display the data filtered by the user
        fetchQueryNews();
    });

})

//Get data for the Headlines (when the page is opened)
const fetchHeadlines = async () =>{
    //API Call
    const response = await fetch(SEARCH_NEWS + "&apiKey=" + API_KEY);

    //If the call status is success, parse the data, else, display in the console the API status
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson)
        newsDataArr = myJson.articles
    } else {
        console.log(response.status, response.statusText)
    }

    displayNews();
}

//Get data filtered by user (when the search box is used)
const fetchQueryNews = async () => {

    //If the user didn't entered any data, stop the function execution.
    if(newsQuery.value == null){
        return;
    }

    //API Call
    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);

    //Reinitialize the Data Array
    newsDataArr = []

    //If the call status is success, parse the data, else, display in the console the API status
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsDetalies.innerHTML = "<h5>No data Found</h5>";
        return
    }

    displayNews();
}

//Generate the HTML elements with the data received from API Call
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