import { MediaFactory } from "../factories/MediasFactory.js";

/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemins des images
 * @property {string} url Image actuallemnnt affiché
 */
export class Lightbox {
  static init(photographer, photographerMedias) {
    const links = Array.from(document.querySelectorAll(".lightbox_link"));
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const selectedMedia = Array.from(
          link.getElementsByClassName("picture_container_img")
        );

        selectedMedia.forEach((m) => {
          const mediaId = m.getAttribute("data-media-id");

          const media = photographerMedias.find(
            (m) => m.id === Number(mediaId)
          );

          // eslint-disable-next-line no-new
          new Lightbox(photographer, photographerMedias, media);
        });
      })
    );
  }

  /**
   * @param {string} url URL de l'image
   * @param {string[]} images Chemins des images
   */
  constructor(photographer, photographerMedias, media) {
    this.photographer = photographer;
    this.photographerMedias = photographerMedias;
    this.media = media;
    const i = this.photographerMedias.findIndex(
      (image) => image === this.media
    );
    this.element = this.buildDom(this.photographerMedias[i]);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
    this.navigation();
  }

  /**
   *
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.previous(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent / KeyboardEvent} e
   */
  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {MouseEvent / KeyboardEvent} e
   */
  next(e) {
    e.preventDefault();
    let i = this.photographerMedias.findIndex((image) => image === this.media);
    if (i === this.photographerMedias.length - 1) {
      i = -1;
    }
    this.media = this.photographerMedias[i + 1];
    this.updatePicture();
    this.focusableElements = this.getFocusableElements();
  }

  /**
   * @param {MouseEvent / KeyboardEvent} e
   */
  previous(e) {
    e.preventDefault();
    let i = this.photographerMedias.findIndex((image) => image === this.media);
    if (i === 0) {
      i = this.photographerMedias.length;
    }
    this.media = this.photographerMedias[i - 1];
    this.updatePicture();
    this.focusableElements = this.getFocusableElements();
  }

  updatePicture() {
    const container = document.querySelector(".lightbox_container");

    const factory = new MediaFactory();
    const media = factory.createMedia(this.media, this.photographer.id);
    this.mediaHtml = media.render();

    container.innerHTML = `${this.mediaHtml}<p>${this.media.title}</p>`;
  }

  /**
   *
   * @param {string} url URL de l'image
   * @return {HTMLElement}
   */
  buildDom(picture) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = "";

    const factory = new MediaFactory();
    const media = factory.createMedia(picture, this.photographer.id);
    this.mediaHtml = media.render();

    dom.innerHTML = `
        <button class="lightbox_close" aria-label="Close">
          <i class="fa-solid fa-xmark" style="color: #901c1c;"></i>
        </button>
        <button class="lightbox_previous" aria-label="Previous">Précedent</button>
        <button class="lightbox_next" aria-label="Next">Suivant</button>
        <div class="lightbox_container">
           ${this.mediaHtml}
           <p>${this.media.title}</p>
        </div>
        `;

    dom
      .querySelector(".lightbox_close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox_next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox_previous")
      .addEventListener("click", this.previous.bind(this));
    return dom;
  }

  navigation() {
    this.lightbox = document.querySelector(".lightbox");
    this.focusableElements = this.getFocusableElements();
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
    this.lightbox.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        const currentIndex = this.focusableElements.indexOf(
          document.activeElement
        );
        if (currentIndex !== -1) {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % this.focusableElements.length;
          this.focusableElements[nextIndex].focus();
        }
      }
    });
  }

  getFocusableElements() {
    return Array.from(this.lightbox.querySelectorAll("video, button")).filter(
      function (element) {
        return !element.disabled && !element.readOnly;
      }
    );
  }
}
