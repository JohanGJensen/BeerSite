const fakeCollection = [
  {
    id: "1",
    title: "Genesis",
    tags: "Tripel - Belgian Style",
    image: "genesis_beer.jpg",
    apv: "7.9%",
    ingredients: ["pilsner malt", "Styrian Goldings hops", "Hallertauer hops"],
    smells: ["floral", "fruity"],
    tastes: ["caramel", "sweet", "yeasty"],
    color: {
      label: "Amber Golden",
      // hexValues: ["#f6c101", "#df8d03", "#c96e12"],
      hexValues: ["#f6c101"],
    },
  },
];

const selected = fakeCollection[0];

module.exports = {
  collection: fakeCollection,
  selected: selected,
};
