import { PhotographerManager } from "../templates/headerPhotographerPage.js";
import { Lightbox } from "../utils/lightbox.js";

async function getPhotographersMedia() {
  const fetchResult = await fetch("../data/photographers.json");
  return fetchResult.json();
}

async function displayData(photographers, media) {
  // Récupération du paramètre id dans l'URL
  const queryStringUrlId = window.location.search;
  const urlSearchParams = new URLSearchParams(queryStringUrlId);
  const photographerId = urlSearchParams.get("id");
  // eslint-disable-next-line eqeqeq
  const photographer = photographers.find((p) => p.id == photographerId);
  const banner = document.getElementById("photograph-header");
  const gridContainer = document.getElementById("picture_section");
  const sortSection = document.getElementById("sort_picture");
  const containerTotalLikes = document.getElementById(
    "container_counter_likes"
  );

  const photographerManager = new PhotographerManager(photographer);
  const bannerFromClass = photographerManager.displayInfo();
  banner.innerHTML += bannerFromClass;

  photographerManager.getMediasList(media);
  const sortDropdown = photographerManager.displaySortElement();
  sortSection.innerHTML = sortDropdown;

  const mediasGrid = photographerManager.sortByLikes();
  gridContainer.innerHTML = mediasGrid;

  document.addEventListener("sortMedia", (e) => {
    if (e.detail) {
      gridContainer.innerHTML = e.detail;
      photographerManager.addCounterLikes();
      Lightbox.init(photographer, photographerManager.mediasList);
    }
  });

  const totalLikes = photographerManager.updateTotalLikes();
  containerTotalLikes.innerHTML = totalLikes;

  document.addEventListener("likeMedia", (e) => {
    if (e.detail) {
      containerTotalLikes.innerHTML = e.detail;
    }
  });

  photographerManager.sortMedia();
  photographerManager.addCounterLikes();
  photographerManager.deleteLink();

  Lightbox.init(photographer, photographerManager.mediasList);
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographersMedia();
  displayData(photographers, media);
}

init();
