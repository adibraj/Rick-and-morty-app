export const CHARACTER_ID_2 = {
  id: "2",
  name: "Beth Smith",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Female",
  origin: {
    name: "Earth (Replacement Dimension)",
    type: "Planet",
  },
  location: {
    name: "Earth (Replacement Dimension)",
    type: "Planet",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  created: "2017-11-04T19:22:43.665Z",
  episode: [
    {
      air_date: "January 27, 2014",
      created: "2017-11-10T12:56:34.339Z",
      episode: "S01E06",
      id: "6",
      name: "Rick Potion #9",
    },
    {
      air_date: "April 14, 2014",
      created: "2017-11-10T12:56:34.850Z",
      episode: "S01E11",
      id: "11",
      name: "Ricksy Business",
    },
    {
      air_date: "August 23, 2015",
      created: "2017-11-10T12:56:35.364Z",
      episode: "S02E05",
      id: "16",
      name: "Get Schwifty",
    },
    {
      air_date: "September 13, 2015",
      created: "2017-11-10T12:56:35.569Z",
      episode: "S02E07",
      id: "18",
      name: "Big Trouble in Little Sanchez",
    },
  ],
};

export const CHARACTER_DETAIL_RESPONSE = {
  data: {
    character: CHARACTER_ID_2,
  },
};
