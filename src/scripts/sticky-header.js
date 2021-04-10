window.addEventListener("scroll", function(){
    var headerToolbar = document.querySelector(".header-toolbar");
    if (window.scrollY > 0) {
        headerToolbar.classList.add("navbar-dark");
        headerToolbar.classList.remove("navbar-light");
    } else {
        headerToolbar.classList.remove("navbar-dark");
        headerToolbar.classList.add("navbar-light");
    }
})

function showNavigation() {
    var headerToolbarMenu = document.querySelector("#header-toolbar-menu");
    var leftNavigator = document.querySelector(".left-nav");
    if (document.documentElement.clientWidth < 1280) {
        headerToolbarMenu.style.visibility = "visible"
        leftNavigator.style.visibility = "hidden"
    } else {
        headerToolbarMenu.style.visibility = "hidden"
        leftNavigator.style.visibility = "visible"
    }
}

window.addEventListener("load", showNavigation);
window.addEventListener("resize", showNavigation);