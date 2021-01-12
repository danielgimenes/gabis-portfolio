function hideProjects() {
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
        var expansible = document.getElementById("expansible");
        expansible.style.maxHeight = (expansible.clientHeight / 2) + "px";
        var expandButton = document.getElementById("expandButton");
        expandButton.style.display = "inline-block";
    }
}

function expand() {
    var expansible = document.getElementById("expansible");
    expansible.classList.toggle("active");
    if (expansible.style.maxHeight){
        expansible.style.maxHeight = null;
    } else {
        expansible.style.maxHeight = expansible.scrollHeight + "px";
    } 
    var expandButton = document.getElementById("expandButton");
    expandButton.style.display = "none";
}