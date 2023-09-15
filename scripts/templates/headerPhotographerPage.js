/**
 *
 * @param {Array<Object>} photographers
 * @param {string | number} photographerId
 * @returns {string} DOM template for photographer header
 */
export function getPhotographerInfo(photographer) {
  const picture = `assets/photographers/${photographer.id}/${photographer.portrait}`;

  //ajout de la banniere dans le DOM
  return `
    <div>
      <h1>${photographer.name}</h1>
      <h3 class="location">${photographer.city}, ${photographer.country}</h3>
      <p class="tagline">${photographer.tagline}</p>
    </div>

    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    
    <img src="${picture}" alt="Profile picture of ${photographer.name}" class="banner_photographer_img">
  `;
}

/**
 *
 * @param {string | number} photographerId
 * @param {Array<object>} mediasList
 * @returns {Array<object>}
 */
export function getPhotographerMedia(photographerId, mediasList) {
  return mediasList.filter((m) => m.photographerId == photographerId);
}

function sortByLikes(mediasList) {
  mediasList.sort((a, b) => b.likes - a.likes);
}

function sortByDate(mediasList) {
  mediasList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sortByTitle(mediasList) {
  mediasList.sort((a, b) => (a.title > b.title ? 1 : -1));
}

function sortMedia(mediasList) {
  const select = document.getElementById("values_select");
  console.log(select);
  select.addEventListener("input", () => {
    console.log("je change le select");
    generateMediasGrid(mediasList);
  });
  // generateMediasGrid(mediasList);
}

/**
 *
 * @param {Array<object>} mediasList
 * @param {'Popularité' | 'Titre' | 'Date'} sortOption = "Popularité"
 * @returns {string} DOM string
 */
export function generateMediasGrid(
  mediasList,
  photographerId,
  sortOption = "Popularité"
) {
  // section.innerHTML = "";

  if (sortOption === "Popularité") {
    sortByLikes(mediasList);
    console.log(sortOption);
  } else if (sortOption === "Titre") {
    sortByTitle(mediasList);
  } else if (sortOption === "Date") {
    sortByDate(mediasList);
  }
  const gridDOMElements = [];

  mediasList.forEach((item) => {
    const element = item;
    const picture = `assets/photographers/${photographerId}/${element.image}`;
    const video = `assets/photographers/${photographerId}/${element.video}`;
    let mediaDiv;
    let mediaElement;

    if (element.image) {
      mediaElement = picture;
      mediaDiv = `
        <a href="${mediaElement}">
          <img src=${mediaElement} alt="Photo prise par " class="picture_container_img"/>
        </a>`;
    } else if (element.video) {
      mediaElement = video;
      mediaDiv = `
        <a href="${mediaElement}">
          <video controls type="video/mp4" class="picture_container_img">
            <source src=${mediaElement} />
          </video>
        </a>
        `;
    }

    // Ajout des medias dans le DOM
    gridDOMElements.push(`
        <div class="picture_container" data-id="${element.id}">
          ${mediaDiv}
          <div class="picture_container_description">
            <p class="picture_container_description_title">${element.title}</p>
            <div class="picture_container_description_like">
              <p class="picture_container_description_like_number">${element.likes}</p>
              <div class="container_heart">
                <i class="fa-regular fa-heart empty_heart" style="color: #901c1c;"></i>
              </div>
            </div>
          </div>
        </div>
            `);
    addCounterLikes(element, mediasList);
  });
  sortMedia(mediasList);
  return gridDOMElements;
}

/**
 * Create sort dropdown
 * @returns {string}
 */
export function displayPicturesSortDropdown() {
  // Ajout du select dans le DOM
  return `
      <p>Trier par</p>
    
    <select name="values" id="values_select">
      <option value="Popularité" >Popularité</option>
      <option value="Date">Date</option>
      <option value="Titre">Titre</option>
    </select>
  `;
}

function addCounterLikes(element, mediasList) {
  const containerHeart = document.getElementsByClassName("container_heart");
  const hearts = document.getElementsByClassName("fa-heart");
  const likesContainer = document.getElementsByClassName(
    "picture_container_description_like_number"
  );

  // Initialiser l'état de liked pour chaque media
  mediasList.forEach((media) => {
    media.liked = false; // réinitialise le coeur à "vide"
  });

  for (let i = 0; i < containerHeart.length; i++) {
    containerHeart[i].addEventListener("click", () => {
      if (element[i].liked) {
        console.log("Unlike");
        // Si déjà liké, unliké
        hearts[i].classList.remove("fa-solid");
        hearts[i].classList.add("fa-regular");
        element[i].liked = false;
        element[i].likes--; // Décrémenter le compteur de likes
      } else {
        console.log("like");
        // Si non liké, liké
        hearts[i].classList.remove("fa-regular");
        hearts[i].classList.add("fa-solid");
        element[i].liked = true;
        element[i].likes++; // Incrémenter le compteur de likes
      }

      // Mettre à jour le compteur de likes
      likesContainer[i].textContent = element[i].likes;

      // Mettre à jour le compteur total de likes
      updateTotalLikes();
    });
  }

  // Initialiser le compteur total de likes
  // updateTotalLikes();
}

// Fonction pour mettre à jour le compteur total de likes
export function updateTotalLikes(mediasList, photographer) {
  const allLikes = mediasList.reduce((acc, curr) => {
    acc += curr.likes;
    return acc;
  }, 0);

  return `
    <div class="container_counter_likes">
      <div class="likes_counter">
        ${allLikes}
        <i class="fa-solid fa-heart"></i>
      </div>
      <div class="price">
        ${photographer.price}€ / jour
      </div>
    </div>
  `;
}

// export function headerPhotographerTemplate(
//   dataPhotographer,
//   mediaPhotographer
// ) {

//   /*
//   function addCounterLikes() {
//     const containerHeart = document.getElementsByClassName("container_heart");
//     const hearts = document.getElementsByClassName("fa-heart");
//     const likesContainer = document.getElementsByClassName(
//       "picture_container_description_like_number"
//     );

//     // Initialiser l'état de liked pour chaque media
//     findMedia.forEach((media) => {
//       media.liked = false; // réinitialise le coeur à "vide"
//     });

//     for (let i = 0; i < containerHeart.length; i++) {
//       containerHeart[i].addEventListener("click", () => {
//         if (findMedia[i].liked) {
//           // Si déjà liké, unliké
//           hearts[i].classList.remove("fa-solid");
//           hearts[i].classList.add("fa-regular");
//           findMedia[i].liked = false;
//           findMedia[i].likes--; // Décrémenter le compteur de likes
//         } else {
//           // Si non liké, liké
//           hearts[i].classList.remove("fa-regular");
//           hearts[i].classList.add("fa-solid");
//           findMedia[i].liked = true;
//           findMedia[i].likes++; // Incrémenter le compteur de likes
//         }

//         // Mettre à jour le compteur de likes
//         likesContainer[i].textContent = findMedia[i].likes;

//         // Mettre à jour le compteur total de likes
//         updateTotalLikes();
//       });
//     }

//     // Initialiser le compteur total de likes
//     // updateTotalLikes();
//   }*/
//   /*
//   // Fonction pour mettre à jour le compteur total de likes
//   function updateTotalLikes() {
//     const div = document.createElement("div");
//     div.classList.add("container_counter_likes");
//     const allLikes = findMedia.reduce((acc, curr) => {
//       acc += curr.likes;
//       return acc;
//     }, 0);

//     div.innerHTML = `
//     <div class="likes_counter">
//       ${allLikes}
//       <i class="fa-solid fa-heart"></i>
//     </div>
//     <div class="price">
//       ${findPhotographer[0].price}€ / jour
//     </div>
//   `;

//     return div;
//   }*/

//   return {
//     getPhotographerInfo,
//     sortPictures: displayPicturesSortDropdown,
//     // getMedia,
//     // updateTotalLikes,
//   };
// }
