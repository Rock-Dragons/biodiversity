//Navbar Area

$.get("/components/navbar.html", function(data){

    $("#navbar-placeholder").replaceWith(data);
    
    setActiveNavbarElement();

    $('#icon').click(function(){
        
        toggleNav();
    });
});

function toggleNav(){
    console.log("nav-toggle");
    $('#navbar-container').toggleClass('show');
}

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

//Scroll Button Area
let scrollButton;
$.get("/components/scrollButton.html", function(data){
    console.log('done');
    $("#scrollButton-placeholder").replaceWith(data);
    scrollButton = document.getElementById("scrollButton");
})

window.onscroll = function() {displayScrollButton()};

function displayScrollButton() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "block";
} else {
    scrollButton.style.display = "none";
}
}


function goToTop() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}

//Footer Area
$.get("/components/footer.html", function(data){
    console.log('footer-loaded');
    if(actualPage != 'home'){
        $("#footer-placeholder").replaceWith(data);
    }
})