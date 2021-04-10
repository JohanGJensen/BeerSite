const doSetSelectedBeer = (id) => {
  const url = `${origin}/beer/selected/${id}`;
  const xml = new XMLHttpRequest();

  xml.open("POST", url);
  xml.send({ id: id });
};

const doGetSelectedBeer = async () => {
  const url = `${origin}/beer/selected`;
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
  const url = `${origin}/beer/all`;

  const response = await fetch(url, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));

  return response;
};
