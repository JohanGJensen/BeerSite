const container = document.getElementById("articles-parent");

let apiMounted = true;

const initViewer = () => {
  if (apiMounted && typeof doGetSelectedBeer === "function") {
    doGetSelectedBeer()
      .then(setViewerComponentValues)
      .catch((err) => console.error(err));
  }
};

const getViewPage = (value) => {
  const id = value.getAttribute("id").split("article-")[1];

  if (apiMounted && id) doSetSelectedBeer(id);

  location.href = `${origin}/viewer`;
};

const goBack = () => {
  location.href = origin;
};

const mountApiHandlers = () => {
  const body = document.getElementsByTagName("body");
  const script = document.createElement("script");

  script.src = "/js/API.js";
  body[0].appendChild(script);

  apiMounted = true;
};

const setViewerComponentValues = (res) => {
  document.title = `Beer Viewer: (${res.title})`;

  setInnerTextWithString(".product-title", res.title);
  setInnerTextWithString(".product-tags", res.tags);
  setInnerTextWithString(".product-apv", res.apv);

  setImageWithSrc(".viewer-image", `../assets/images/${res.image}`);

  setInnerTextWithArray(".product-ingredients", res.ingredients);
  setInnerTextWithArray(".product-smells", res.smells);
  setInnerTextWithArray(".product-tastes", res.tastes);

  setColorsInContainer(".color-container", res.color.hexValues);
};

const setInnerTextWithString = (id, res) => {
  const el = document.querySelector(id);

  el.innerText = res;
};

const setImageWithSrc = (id, src) => {
  const image = document.querySelector(id);

  image.src = src;
};

const setInnerTextWithArray = (id, res) => {
  const el = document.querySelector(id);

  el.innerText = "";
  for (let i = 1; res.length >= i; i++) {
    let response = res[i - 1];

    if (res.length === i) {
      el.innerText += ` ${response}`;
    } else {
      el.innerText += ` ${response} - `;
    }
  }
};

const setColorsInContainer = (id, values) => {
  const color = document.querySelector(id);
  // clear colors
  color.innerHTML = "";

  for (let i = 0; values.length > i; i++) {
    let value = values[i];
    const div = createClassedElement("div", "color-box");

    div.style.backgroundColor = value;

    color.appendChild(div);
  }
};

const createClassedElement = (tag, cls) => {
  if (typeof tag !== "string" || typeof cls !== "string")
    return console.warn("please provide strings!");

  const el = document.createElement(tag);
  el.classList = `${cls}`;

  return el;
};

const buildArticles = async () => {
  let collection = await doGetAllBeers();

  // clear container
  container.innerHTML = "";

  for (let i = 0; collection.length > i; i++) {
    const item = collection[i];

    const article = `<article
      id="article-${item.id}"
      class="beer-article"
      onclick="getViewPage(this)"
    >
      <h6 class="beers-h6">${item.title}</h6>
      <img src="${await doGetImage(
        item.image
      )}" alt="beer" class="beer-image" />
      <div class="beers-p-container">
        <p class="beers-p">${item.tags}</p>
      </div>
    </article>`;

    container.innerHTML = article;
  }
};
