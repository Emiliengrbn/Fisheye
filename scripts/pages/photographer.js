import {
  displayPicturesSortDropdown,
  generateMediasGrid,
  getPhotographerInfo,
  getPhotographerMedia,
  updateTotalLikes,
  // headerPhotographerTemplate,
} from "../templates/headerPhotographerPage.js";

async function getPhotographersMedia() {
  const fetchResult = await fetch("../data/photographers.json");
  return fetchResult.json();
}

async function displayData(photographers, media) {
  //Récupération du paramètre id dans l'URL
  const queryStringUrlId = window.location.search;
  const urlSearchParams = new URLSearchParams(queryStringUrlId);
  const photographerId = urlSearchParams.get("id");
  const photographer = photographers.find((p) => p.id == photographerId);

  const main = document.getElementById("main");
  // const aze = headerPhotographerTemplate(photographers, media);

  const photographerBanner = getPhotographerInfo(photographer);
  const banner = document.getElementById("photograph-header");
  banner.innerHTML += photographerBanner;

  const sort = displayPicturesSortDropdown();
  const sortSection = document.getElementById("sort_picture");
  sortSection.innerHTML += sort;

  const mediaData = getPhotographerMedia(photographerId, media);
  const dom = generateMediasGrid(mediaData, photographerId);
  const grid_container = document.getElementById("picture_section");
  grid_container.innerHTML += dom;

  const totalLikes = updateTotalLikes(mediaData, photographer);
  main.innerHTML += totalLikes;

  // const likesPrice = aze.updateTotalLikes();
  // main.innerHTML += likesPrice;
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographersMedia();
  displayData(photographers, media);
}

init();
