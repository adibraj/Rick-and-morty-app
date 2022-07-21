export interface ICharacterLocation {
  id: string;
  name: string;
  type: string;
}

export interface IEpisode {
  id: string;
  air_date: string;
  created: string;
  episode: string;
  name: string;
}

export default interface ICharacter {
  id: string;
  name: string;
  image: string;
  created: string;
  location: ICharacterLocation;
  episode: Array<IEpisode>;
  gender: string;
  species: string;
  type: string;
  status: string;
}
