import { gql, useQuery } from "@apollo/client";
import ICharacter from "../types/ICharacter";

export interface FetchCharactersQueryResponse {
  characters: {
    results: ICharacter[];
    info: {
      count: number;
      pages: number;
      prev: number | null;
      next: number | null;
    };
  };
}

export const FETCH_CHARACTERS = gql`
  query ($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        location {
          name
          type
        }
      }
    }
  }
`;

interface IQuery {
  characters?: ICharacter[];
  pages?: number;
  loading: boolean;
}

export interface Ifilter {
  name?: string;
  gender?: string;
  status?: string;
}

export function useFetchCharactersQuery(
  page: number,
  filter: Ifilter,
  debouncedSearchTerm: string
): IQuery {
  const { data, loading } = useQuery<FetchCharactersQueryResponse>(
    FETCH_CHARACTERS,
    {
      variables: { page, filter: { ...filter, name: debouncedSearchTerm } },
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    characters: data?.characters?.results,
    pages: data?.characters?.info?.pages,
    loading,
  };
}
