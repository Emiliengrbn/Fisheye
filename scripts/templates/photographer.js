// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
  const { name, id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/photographers_photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    article.innerHTML += `
      <a id="${id}" href="./photographer.html?id=${id}">
        <img src="${picture}" alt="Profile picture of ${name}">
        <h2>${name}</h2>
      </a>
      <div class="description">
        <h3 class="location">${city}, ${country}</h3>
        <p class="tagline">${tagline}</p>
        <p class="price">${price}€/jour</p>
      </div>
    `;
    return article;
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM };
}
