import { MediaFactory } from "../factories/MediasFactory.js";

export class PhotographerManager {
  constructor(photographer) {
    this.photographer = photographer;
  }

  /* Banniere photographe */
  displayInfo() {
    const picture = `assets/photographers/${this.photographer.id}/${this.photographer.portrait}`;

    // ajout de la banniere dans le DOM
    return `
      <div>
        <h1>${this.photographer.name}</h1>
        <h2 class="location">${this.photographer.city}, ${this.photographer.country}</h2>
        <p class="tagline">${this.photographer.tagline}</p>
      </div>
  
      <button class="contact_button" onclick="displayModal()" aria-label="Open">Contactez-moi</button>
      
      <img src="${picture}" alt="Profile picture of ${this.photographer.name}" class="banner_photographer_img">
    `;
  }

  /* Liste des medias du photographe */
  getMediasList(mediasList) {
    this.mediasList = mediasList.filter(
      (m) => m.photographerId == this.photographer.id
    );
    return this.mediasList;
  }

  /* Ajout de l'élement select */
  displaySortElement() {
    return `
      <label for="values_select">Trier par</label>
    
    <select name="values" id="values_select">
      <option value="Popularité">Popularité</option>
      <option value="Date" >Date</option>
      <option value="Titre">Titre</option>
    </select>
  `;
  }

  /* Ajout des medias */
  displayMediasGrid() {
    const gridDOMElements = [];

    this.mediasList.forEach((item) => {
      const element = item;

      const factory = new MediaFactory();
      const media = factory.createMedia(element, this.photographer.id);
      const mediaHtml = media.render();

      // Ajout des medias dans le DOM
      gridDOMElements.push(`
          <div class="picture_container">
            <a href="#" class="lightbox_link" title="${element.title}">
              ${mediaHtml}
            </a>
            <div class="picture_container_description">
              <h2 class="picture_container_description_title">${
                element.title
              }</h2>
              <div class="picture_container_description_like">
                <p class="picture_container_description_like_number">${
                  element.likes
                }</p>
                <button class="container_heart" aria-label="Like">
                  <i class=" fa-heart ${
                    element.liked ? "fa-solid" : "fa-regular"
                  } empty_heart" style="color: #901c1c;"></i>
                </button>
              </div>
            </div>
          </div>
              `);
    });
    return gridDOMElements.join("");
  }

  /* Tri par like */
  sortByLikes() {
    this.mediasList.sort((a, b) => b.likes - a.likes);
    return this.displayMediasGrid(this.mediasList);
  }

  /* Tri par date */
  sortByDate() {
    this.mediasList.sort((a, b) => new Date(b.date) - new Date(a.date));
    return this.displayMediasGrid(this.mediasList);
  }
  /* Tri par tire */
  sortByTitle() {
    this.mediasList.sort((a, b) => (a.title > b.title ? 1 : -1));
    return this.displayMediasGrid(this.mediasList);
  }

  /* Trier les medias en fontion du select */
  sortMedia() {
    const select = document.getElementById("values_select");
    select.addEventListener("input", () => {
      /** @type {string} */
      let sortResultDOM;
      if (select.value === "Popularité") {
        sortResultDOM = this.sortByLikes(this.mediasList);
      } else if (select.value === "Date") {
        sortResultDOM = this.sortByDate(this.mediasList);
      } else if (select.value === "Titre") {
        sortResultDOM = this.sortByTitle(this.mediasList);
      }

      const sortEvent = new CustomEvent("sortMedia", {
        detail: sortResultDOM,
      });
      document.dispatchEvent(sortEvent);
    });
  }

  /* Fonctionnalité de like/unlike */
  addCounterLikes() {
    const containerHeart = document.getElementsByClassName("container_heart");
    const arrayContainerHeart = Array.from(containerHeart);
    const hearts = document.getElementsByClassName("fa-heart");
    const likesContainer = document.getElementsByClassName(
      "picture_container_description_like_number"
    );

    arrayContainerHeart.forEach((element, i) => {
      element.addEventListener("click", () => {
        if (this.mediasList[i].liked) {
          // Si déjà liké, unliké
          hearts[i].classList.remove("fa-solid");
          hearts[i].classList.add("fa-regular");
          this.mediasList[i].liked = false;
          this.mediasList[i].likes--; // Décrémenter le compteur de likes
        } else {
          // Si non liké, liké
          hearts[i].classList.remove("fa-regular");
          hearts[i].classList.add("fa-solid");
          this.mediasList[i].liked = true;
          this.mediasList[i].likes++; // Incrémenter le compteur de likes
        }
        // Mettre à jour le compteur de likes
        likesContainer[i].textContent = this.mediasList[i].likes;

        const likeEvent = new CustomEvent("likeMedia", {
          detail: this.updateTotalLikes(),
        });
        document.dispatchEvent(likeEvent);
      });
    });
  }

  // mettre à jour le compteur total de likes
  updateTotalLikes() {
    const allLikes = this.mediasList.reduce((acc, curr) => {
      acc += curr.likes;
      return acc;
    }, 0);

    return `
        <div class="likes_counter">
          ${allLikes}
          <i class="fa-solid fa-heart"></i>
        </div>
        <div class="price">
          ${this.photographer.price}€ / jour
        </div>
    `;
  }

  /* Supprimer les liens pour la lightbox */
  deleteLink() {
    const links = Array.from(document.getElementsByClassName("lightbox_link"));
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }
}
