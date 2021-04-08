const container = document.getElementById("articles-parent");

let apiMounted = true;

const initViewer = () => {
  if (apiMounted && typeof doGetSelectedBeer === "function") {
    doGetSelectedBeer()
      .then((res) => {
        applyResponse(res);
      })
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
  const title = document.getElementById("product-title");
  const tags = document.getElementById("product-tags");
  const image = document.getElementById("product-image");
  const apv = document.getElementById("product-apv");
  const ingredients = document.getElementById("product-ingredients");
  const smells = document.getElementById("product-smells");
  const tastes = document.getElementById("product-tastes");
  const color = document.getElementById("color-container");

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
    const div = document.createElement("div");

    div.classList = "color-box";

    div.style.backgroundColor = value;

    container.appendChild(div);
  }
};
