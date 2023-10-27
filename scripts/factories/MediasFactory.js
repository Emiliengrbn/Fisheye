export class MediaFactory {
  createMedia(element, photographerId) {
    if (element.image) {
      return new ImageMedia(element, photographerId);
    }
    if (element.video) {
      return new VideoMedia(element, photographerId);
    }
  }
}

class ImageMedia {
  constructor(element, photographerId) {
    this.element = element;
    this.mediaElement = `assets/photographers/${photographerId}/${element.image}`;
  }

  render() {
    return `
            <img src=${this.mediaElement} alt="${this.element.title} " class="picture_container_img" data-media-id="${this.element.id}" loading="lazy"/>
            `;
  }
}

class VideoMedia {
  constructor(element, photographerId) {
    this.element = element;
    this.mediaElement = `assets/photographers/${photographerId}/${element.video}`;
  }

  render() {
    return `
            <video controls="controls" src=${this.mediaElement} alt="${this.element.title}"  type="video/mp4" class="picture_container_img" data-media-id="${this.element.id}">
            </video>
        `;
  }
}
