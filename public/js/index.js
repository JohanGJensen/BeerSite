const container = document.getElementById("articles-parent");
let apiMounted = false;

const getViewPage = (value) => {
  const id = value.getAttribute("id").split("article-")[1];

  if (apiMounted && id) setSelectedBeer(id);

  location.href = `${origin}/pages/viewer`;
};

const mountApiHandlers = () => {
  const body = document.getElementsByTagName("body");
  const script = document.createElement("script");

  script.src = "/js/API.js";
  body[0].appendChild(script);

  apiMounted = true;
};
