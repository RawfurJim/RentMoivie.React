const movies = [
  {
    _id: "1",
    title: "Terminatior",
    jhonra: {
      _id: "5f4225b166290f13b03abb82",
      name: "Action",
    },
    numberInstock: 3,
    dailyRentalRate: 5,
    liked: true,
  },
  {
    _id: "2",
    title: "Boss",
    jhonra: {
      _id: "5f4225b166290f13b03abb82",
      name: "Action",
    },
    numberInstock: 3,
    dailyRentalRate: 5,
  },
  {
    _id: "3",
    title: "Mr. Bin",
    jhonra: {
      _id: "5f4225d966290f13b03abb84",
      name: "Comedy",
    },
    numberInstock: 3,
    dailyRentalRate: 5,
  },
  {
    _id: "4",
    title: "Home Alone",
    jhonra: {
      _id: "5f4225d966290f13b03abb84",
      name: "Comedy",
    },
    numberInstock: 3,
    dailyRentalRate: 5,
  },
  {
    _id: "5",
    title: "B3",
    jhonra: {
      _id: "5f4225ce66290f13b03abb83",
      name: "Romance",
    },
    numberInstock: 6,
    dailyRentalRate: 5,
  },
];
export function getMovies() {
  return movies;
}
