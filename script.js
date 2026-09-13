let currentIndex = 0;
let visibleImages = [];

const cards = document.querySelectorAll(".card");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const counter = document.getElementById("counter");


// Open Lightbox

cards.forEach(card => {

    card.addEventListener("click", function () {

        visibleImages = [...document.querySelectorAll(".card:not(.hidden)")];

        currentIndex = visibleImages.indexOf(card);

        showImage();

        lightbox.style.display = "flex";
    });

});


// Show Image

function showImage() {

    let card = visibleImages[currentIndex];

    let image = card.querySelector("img");

    lightboxImage.src = image.src;

    lightboxTitle.textContent =
        card.querySelector("h3").textContent;

    counter.textContent =
        `${currentIndex + 1} / ${visibleImages.length}`;
}


// Next / Previous

function changeImage(direction) {

    currentIndex += direction;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage();
}


// Close

function closeLightbox() {

    lightbox.style.display = "none";
}


// Click outside image

lightbox.addEventListener("click", function(e) {

    if (e.target === lightbox) {
        closeLightbox();
    }

});


// Keyboard Navigation

document.addEventListener("keydown", function(e) {

    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") {
            changeImage(1);
        }

        if (e.key === "ArrowLeft") {
            changeImage(-1);
        }

        if (e.key === "Escape") {
            closeLightbox();
        }
    }

});


// Category Filter

function filterImages(category, button) {

    document.querySelectorAll(".filters button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {
            card.classList.remove("hidden");
            card.style.display = "block";
        }
        else {
            card.classList.add("hidden");
            card.style.display = "none";
        }
    });

    searchImages();
}


// Search

document.getElementById("searchInput")
    .addEventListener("input", searchImages);


function searchImages() {

    let search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let count = 0;

    cards.forEach(card => {

        let name =
            card.dataset.name.toLowerCase();

        let isHidden =
            card.classList.contains("hidden");

        if (name.includes(search) && !isHidden) {

            card.style.display = "block";

            count++;
        }
        else if (!isHidden) {

            card.style.display = "none";
        }
    });

    document.getElementById("noResults").style.display =
        count === 0 ? "block" : "none";
}


// Dark / Light Mode

document.getElementById("themeBtn")
    .addEventListener("click", function() {

        document.body.classList.toggle("dark");

        this.textContent =
            document.body.classList.contains("dark")
            ? "☀️"
            : "🌙";
    });