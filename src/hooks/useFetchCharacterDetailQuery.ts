import { ApolloError, gql, useQuery } from "@apollo/client";
import ICharacter from "../types/ICharacter";

export interface FetchCharacterDetailQueryResponse {
  character: ICharacter;
}

export const FETCH_CHARACTER_DETAIL = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        type
      }
      location {
        name
        type
      }
      image
      created
      episode {
        air_date
        created
        episode
        id
        name
      }
    }
  }
`;

interface IQuery {
  character: ICharacter | undefined;
  loading: boolean;
  error?: ApolloError;
}

export function useFetchCharacterDetailQuery(id: string): IQuery {
  const { data, loading, error } = useQuery<FetchCharacterDetailQueryResponse>(
    FETCH_CHARACTER_DETAIL,
    {
      variables: {
        id: id,
      },
    }
  );
  return { character: data?.character, loading, error };
}
