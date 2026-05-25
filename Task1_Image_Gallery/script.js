let items = Array.from(document.querySelectorAll(".gallery-item"));
let visibleItems = [...items];

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;
let zoomLevel = 1;
let slideInterval = null;

/* OPEN */
items.forEach(item => {
    let img = item.querySelector("img");

    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        currentIndex = visibleItems.indexOf(item);
        resetZoom();
    });
});

/* CLOSE */
document.querySelector(".close").onclick = () => {
    lightbox.style.display = "none";
    stopSlideshow();
};

/* NEXT */
document.getElementById("next").onclick = () => {
    nextImage();
};

/* PREV */
document.getElementById("prev").onclick = () => {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateImage();
};

/* UPDATE IMAGE */
function updateImage() {
    lightboxImg.src = visibleItems[currentIndex].querySelector("img").src;
    resetZoom();
}

/* NEXT FUNCTION */
function nextImage() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateImage();
}

/* FILTER */
function filterImages(category, btn) {
    visibleItems = [];

    document.querySelectorAll(".filters button").forEach(b => {
        b.classList.remove("active");
    });

    btn.classList.add("active");

    items.forEach(item => {
        if (category === "all" || item.dataset.category === category) {
            item.style.display = "block";
            visibleItems.push(item);
        } else {
            item.style.display = "none";
        }
    });
}

/* ZOOM (SCROLL) */
lightboxImg.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY < 0) zoomLevel += 0.1;
    else zoomLevel -= 0.1;

    zoomLevel = Math.max(1, Math.min(3, zoomLevel));
    lightboxImg.style.transform = `scale(${zoomLevel})`;
});

function resetZoom() {
    zoomLevel = 1;
    lightboxImg.style.transform = "scale(1)";
}

/* SLIDESHOW */
document.getElementById("play").onclick = () => {
    if (slideInterval) {
        stopSlideshow();
    } else {
        slideInterval = setInterval(nextImage, 2000);
    }
};

function stopSlideshow() {
    clearInterval(slideInterval);
    slideInterval = null;
}

/* THEME TOGGLE */
document.getElementById("theme-toggle").onclick = () => {
    document.body.classList.toggle("light");
};