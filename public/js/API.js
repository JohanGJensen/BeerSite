const setSelectedBeer = (id) => {
  const url = `${origin}/beer/selected/${id}`;
  const xml = new XMLHttpRequest();

  //   xml.onload = (e, r) => console.log(e, r);
  xml.open("POST", url);
  xml.send({ id: id });
};
