const doSetSelectedBeer = (id) => {
  const url = `${origin}/beer/selected/${id}`;
  const xml = new XMLHttpRequest();

  xml.open("POST", url);
  xml.send({ id: id });
};

const doGetSelectedBeer = async () => {
  const url = `${origin}/beer/selected`;
  const xml = new XMLHttpRequest();

  return await new Promise((resolve, reject) => {
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
