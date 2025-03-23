import { fetchData } from "./js/pixabay-api";
import { renderGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import warningIcon from "./img/warning-icon.svg";
import cautionIcon from "./img/caution-icon.svg";

const form = document.querySelector(".form");
const input = document.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector("#loadMoreBtn");

let page = 1;
let query = ''; 
let totalHits = 0;
let currentHits = 0;
const perPage = 15;


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    query = input.value.trim();
    if (!query) {
        clearGallery();
        loadMoreBtn.style.display = "none";

        iziToast.show({
            title: "Caution",
            titleColor: "#fff", 
            titleSize: "16px",
            titleLineHeight: "1.5",

            message: `Not valid data`,
            messageColor: "#fff",
            messageSize: "16px",
            messageLineHeight: "1.5",

            backgroundColor: "#ffa000",
            iconUrl: cautionIcon,

            progressBar: false,
            position: "topRight",
        });
        return;
    }

    page = 1;
    currentHits = 0;
    totalHits = 0;
    clearGallery();
    showLoader();
    loadMoreBtn.style.display = "none";

    try {
        await loadImages(query, page);
    } catch (error) {
            showErrorToast();
        } finally {
            hideLoader();
            form.reset();
        }
});

loadMoreBtn.addEventListener("click", async () => {
    if (!query) return;

    page++;
    try {
        await loadImages(query, page, false);
    } catch (error) {
       showErrorToast();
    }
});

async function loadImages(query, page, clear = true) {
    if (clear) clearGallery();

    try {
        const imagesData = await fetchData(query, page, perPage);
        totalHits = imagesData.totalHits;
        currentHits = imagesData.hits.length;

        if (imagesData.hits.length === 0 && page === 1) {
            clearGallery();
            loadMoreBtn.style.display = "none";
            showEndMessageToast();
            return;
        }

        renderGallery(imagesData.hits, !clear);
        toggleLoadMoreButton();

        if (!clear) {
            scrollToNextImages();
        }
    } catch (error) {
        throw error;
    }

}


function toggleLoadMoreButton() {
    if (currentHits + (page - 1) * perPage >= totalHits) {
        loadMoreBtn.style.display = "none";
        showEndMessageToast();
    } else {
        loadMoreBtn.style.display = "block";
    }
}

function scrollToNextImages() {
    const galleryItem = document.querySelector(".gallery-item");
    if (galleryItem) {
        const itemHeight = galleryItem.getBoundingClientRect().height;
        window.scrollBy({
            top: itemHeight * 2,
            behavior: "smooth",
        });
    }
}

function showErrorToast() {
    iziToast.show({              
        message: "Something went wrong. Please try again later.",
        messageColor: "#fafafb",
        backgroundColor: "#ef4040",
        iconUrl: warningIcon,
        progressBar: false,
        position: "topRight",
    });
}

function showEndMessageToast() {
    iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: "#000000",
        backgroundColor: "#cdced1",
        progressBar: false,
        position: "topRight",
    });
}

