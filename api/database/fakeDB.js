const fakeCollection = [
  {
    id: "1",
    title: "Genesis",
    tags: "Tripel - Belgian Style",
    image: "genesis_placeholder.png",
    apv: "7.9%",
    ingredients: ["Pilsner Malt", "Styrian Goldings Hops", "Hallertauer Hops"],
    smells: ["Floral", "Fruity"],
    tastes: ["Caramel", "Sweet", "Yeasty"],
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
