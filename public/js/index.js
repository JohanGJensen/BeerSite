const container = document.getElementById("articles-parent");

let apiMounted = true;

const initViewer = () => {
  if (apiMounted && typeof doGetSelectedBeer === "function") {
    doGetSelectedBeer()
      .then(applyResponse)
      .catch((err) => console.error(err));
  }
};

const getViewPage = (value) => {
  const id = value.getAttribute("id").split("article-")[1];

  if (apiMounted && id) doSetSelectedBeer(id);

  location.href = `${origin}/viewer`;
};

const mountApiHandlers = () => {
  const body = document.getElementsByTagName("body");
  const script = document.createElement("script");

  script.src = "/js/API.js";
  body[0].appendChild(script);

  apiMounted = true;
};

const applyResponse = (res) => {
  const title = document.querySelector(".product-title");
  const tags = document.querySelector(".product-tags");
  const image = document.querySelector(".viewer-image");
  const apv = document.querySelector(".product-apv");
  const ingredients = document.querySelector(".product-ingredients");
  const smells = document.querySelector(".product-smells");
  const tastes = document.querySelector(".product-tastes");
  const color = document.querySelector(".color-container");

  // clear colors
  color.innerHTML = "";

  title.innerText = res.title;
  tags.innerText = res.tags;
  image.src = `../assets/${res.image}`;
  apv.innerText = "APV: " + res.apv;

  setInnerTextWithArray(ingredients, res.ingredients);
  setInnerTextWithArray(smells, res.smells);
  setInnerTextWithArray(tastes, res.tastes);

  setColorsInContainer(color, res.color.hexValues);
};

const setInnerTextWithArray = (el, res) => {
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

const setColorsInContainer = (container, values) => {
  for (let i = 0; values.length > i; i++) {
    let value = values[i];
    const div = createClassedElement("div", "color-box");

    // div.classList = "color-box";

    div.style.backgroundColor = value;

    container.appendChild(div);
  }
};

// const buildViewerComponents = (res) => {
//   const container = document.getElementById("viewer-container-id");

//   // clear elements
//   container.innerHTML = "";

//   // constructed elements
//   const info = createClassedElement("section", "viewer-info-container");
//   const specs = createClassedElement("div", "viewer-specs-container");
//   const specsL = createClassedElement("div", "viewer-specs-left");
//   const specsR = createClassedElement("div", "viewer-specs-right");
//   // titles
//   const h1 = createClassedElement("h1", "product-title");
//   const h4 = createClassedElement("h4", "product-tags");
//   // paragraphs
//   const apvP = createClassedElement("p", "product-apv");
//   const ingredientsP = createClassedElement("p", "product-ingredients");
//   const smellsP = createClassedElement("p", "product-smells");
//   const tastesP = createClassedElement("p", "product-tastes");
//   const colorContainer = createClassedElement("div", "color-container");

//   h1.innerText = res.title;
//   h4.innerText = res.tags;

//   apvP.innerText = "APV: " + res.apv;
//   setInnerTextWithArray(ingredientsP, res.ingredients);
//   setInnerTextWithArray(smellsP, res.smells);
//   setInnerTextWithArray(tastesP, res.tastes);
//   setColorsInContainer(colorContainer, res.color.hexValues);

//   specsL.appendChild(apvP);
//   specsL.appendChild(ingredientsP);
//   specsL.appendChild(smellsP);

//   specsR.appendChild(tastesP);
//   specsR.appendChild(colorContainer);

//   specs.appendChild(specsL);
//   specs.appendChild(specsR);

//   info.appendChild(h1);
//   info.appendChild(h4);
//   info.appendChild(specs);

//   container.appendChild(info);
// };

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

    const article = createClassedElement("article", "beer-article");
    const h6 = createClassedElement("h6", "beers-h6");
    const pContainer = createClassedElement("div", "beers-p-container");
    const p = createClassedElement("p", "beers-p");
    const image = createClassedElement("img", "beer-image");

    image.alt = "beer";
    image.src = "../assets/" + item.image;

    article.id = `article-${item.id}`;
    article.onclick = () => getViewPage(article);

    h6.innerText = item.title;
    p.innerText = item.tags;

    pContainer.appendChild(p);

    article.appendChild(image);
    article.appendChild(h6);
    article.appendChild(pContainer);

    container.appendChild(article);
  }
};
