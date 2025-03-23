import { fetchData } from "./js/pixabay-api";
import { renderGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import warningIcon from "./img/warning-icon.svg";
import cautionIcon from "./img/caution-icon.svg";

const form = document.querySelector(".form");
const input = document.querySelector("input[name='search-text']");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value.trim();
    if (query === "") {
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

    clearGallery();
    showLoader();

    fetchData(query)
        .then((images) => {
            renderGallery(images);
        })
        .catch(() => {
            iziToast.show({              
                message: "Something went wrong. Please try again later.",
                messageColor: "#fafafb",
                messageSize: "16px",
                messageLineHeight: "20px",

                backgroundColor: "#ef4040",
                iconUrl: warningIcon,

                progressBar: false,
                position: "topRight",
            });
        })
        .finally(() => {
            hideLoader();
            form.reset();
        });
});