window.addEventListener("scroll", function(){
    var header = document.querySelector(".header");
    if (window.scrollY > 0) {
        header.classList.add("navbar-dark");
        header.classList.remove("navbar-light");
    } else {
        header.classList.remove("navbar-dark");
        header.classList.add("navbar-light");
    }
})