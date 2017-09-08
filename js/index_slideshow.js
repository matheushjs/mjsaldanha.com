var slideIdx = 1;
window.onload = function() { showSlide(1) };

function incSlide(n){
    slideIdx += n;
    showSlide(slideIdx); 
}

function setSlide(n){
    slideIdx = n;
    showSlide(slideIdx);
}

function showSlide(n){
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("myDot");

    if(n > slides.length) slideIdx = 1;
    if(n < 1) slideIdx = slides.length;

    for(var i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }

    for(var i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" myActive", "");
    }

    slides[slideIdx - 1].style.display = "block";
    dots[slideIdx - 1].className += " myActive";
}