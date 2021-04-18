const fakeCollection = [
  {
    id: "1",
    title: "Genesis",
    tags: "Tripel - Belgian Style",
    image: "beer-test-image.png",
    apv: "7.9%",
    ingredients: ["malt", "hops", "water", "yeast"],
    smells: ["floral", "fruity"],
    tastes: ["caramel", "yeasty"],
    color: {
      label: "Amber Golden",
      hexValues: ["#f6c101", "#df8d03", "#c96e12"],
    },
  },
];

const selected = fakeCollection[0];

module.exports = {
  collection: fakeCollection,
  selected: selected,
};
