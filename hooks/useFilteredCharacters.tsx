import { useQuery } from "@apollo/client";
import GET_CHARACTER_BY_FILTER from "../gql/getCharacterByFilter.gql";

export function useFilteredCharacters(searchParams: URLSearchParams) {
  const filter: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    if (value !== "all" && key !== "character") {
      filter[key] = value;
    }
  }

  const { data, loading, error } = useQuery(GET_CHARACTER_BY_FILTER, {
    variables: { filter },
  });

  return {
    characters: data?.characters?.results || [],
    loading,
    error,
  };
}
