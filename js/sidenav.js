$.get("/components/sidenav.html", function(data){

    $("#sidenav-placeholder").replaceWith(data);
    
    setActiveNavbarElement();

    $('#icon').click(function(){
        console.log("test");
        $('#navbar-container').toggleClass('show');
    });
});

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