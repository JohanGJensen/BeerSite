const apiURL = "http://0.0.0.0:7000";

const doSetSelectedBeer = (id) => {
  const url = `${apiURL}/beer/selected/${id}`;
  const xml = new XMLHttpRequest();

  xml.open("POST", url);
  xml.send({ id: id });
};

const doGetSelectedBeer = async () => {
  const url = `${apiURL}/beer/selected`;
  const xml = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xml.onload = () => {
      if (xml.readyState === 4) {
        return resolve(xml);
      }
    };

    xml.open("GET", url);
    xml.send();
  }).then((req) => {
    return JSON.parse(req.response);
  });
};

const doGetAllBeers = async () => {
  const url = `${apiURL}/beer/all`;

  const response = await fetch(url, { method: "GET", mode: "cors" })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));

  return response;
};

const doGetImage = async (image) => {
  const url = `${apiURL}/files/images/${image}`;
  const reader = new FileReader();

  const blob = await fetch(url, { method: "GET", mode: "cors" })
    .then((res) => {
      return res.blob();
    })
    .catch((err) => console.error(err));

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        return resolve(reader.result);
      }
    };
  });
};
