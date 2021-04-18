const getMimeType = (extension) => {
  let mimeType = "text/html";

  switch (extension) {
    case ".js":
      mimeType = "text/javascript";
      break;
    case ".css":
      mimeType = "text/css";
      break;
    case ".json":
      mimeType = "application/json";
      break;
    case ".png":
      mimeType = "image/png";
      break;
    case ".jpg":
      mimeType = "image/jpg";
      break;
  }

  return mimeType;
};

const getCacheControl = (extension) => {
  let cache = "no-cache";

  switch (extension) {
    case ".js":
    case ".json":
      cache = "no-cache";
      break;
    case ".css":
    case ".png":
    case ".jpg":
      cache = "public, max-age=3600, must-revalidate";
      break;
  }

  return cache;
};

const getPageHtml = (url) => {
  let page = url;

  switch (url) {
    case "/":
    case "/index":
      page = "/index.html";
      break;
    case "/viewer":
      page = "/viewer.html";
      break;
  }

  console.log(page);
  return page;
};

module.exports = {
  getMimeType: getMimeType,
  getCacheControl: getCacheControl,
  getPageHtml: getPageHtml,
};
