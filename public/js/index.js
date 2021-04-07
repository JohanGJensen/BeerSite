const container = document.getElementById("articles-parent");

let apiMounted = true;

const initViewer = () => {
  const title = document.getElementById("product-title");
  const tags = document.getElementById("product-tags");
  const image = document.getElementById("product-image");

  if (apiMounted && typeof doGetSelectedBeer === "function") {
    doGetSelectedBeer()
      .then((res) => {
        title.innerText = res.productTitle;
        tags.innerText = res.productTags;
        image.src = `../assets/${res.productImage}`;
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

// mountApiHandlers(initViewer);
