/*---------------------------------Navbar Area--------------------------------------*/

//Get the Navbar Component and replace it with the placeholder
$.get("/components/navbar.html", function(data){

    $("#navbar-placeholder").replaceWith(data);
    
    setActiveNavbarElement();

    //The Icon is visible only when the viewport width is less than 1220px, and it will toggle the SideBar bisibility
    $('#icon').click(function(){
        toggleNav();
    });
});

/*
Super Simple Navbar State Machine
This function will add the 'active' class to the coresponding NavBar Element depending on actualPage value. 
*/
function setActiveNavbarElement() { 
    switch (actualPage) {
        case "home":
            document.getElementById("navbar-home").setAttribute("class","active");
            break;
        case "news":
            document.getElementById("navbar-news").setAttribute("class","active");
            break;
        case "species":
            document.getElementById("navbar-species").setAttribute("class","active");
            break;
        case "genetic":
            document.getElementById("navbar-genetic").setAttribute("class","active");
            break;
        case "ecosystem":
            document.getElementById("navbar-ecosystem").setAttribute("class","active");
            break;
        case "store":
            document.getElementById("navbar-store").setAttribute("class","active");
            break;
        case "login":
            document.getElementById("navbar-login").setAttribute("class","active");
            break;
        default:
            break;
    }
}

/*
The default SideBar positioning in the CSS is set as left:-100%, but the 'show' class will override it to left:0%
This function will add or remove the class 'show' to the specified element 
*/
function toggleNav(){
    $('#navbar-container').toggleClass('show');
}

/*---------------------------------Scroll Button Area--------------------------------------*/

let scrollButton;

//Get the Scroll Button Component and replace it with the placeholder
$.get("/components/scrollButton.html", function(data){
    $("#scrollButton-placeholder").replaceWith(data);
    scrollButton = document.getElementById("scrollButton");
})

//When the scrolling event is trigger, display the Scroll Button
window.onscroll = function() {
    displayScrollButton()
};

//If value of the scrollTop parameter is bigger than 20px, display the scroll button, if it's less, hide it.
function displayScrollButton() {  
    if (document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}

//This function is called by the scrollButton, it will reset the webpage scroll
function goToTop() {
    // document.documentElement returns the html element , and scrollTop is the value in pixels of the scrolled content
    document.documentElement.scrollTop = 0;
}

/*--------------------------------Footer Area--------------------------------------*/

//Get the Footer Component and replace it with the placeholder
$.get("/components/footer.html", function(data){
    //The home page it is ommited, please keep it like that and don't ask why
    if(actualPage != 'home'){
        $("#footer-placeholder").replaceWith(data);
    }
})