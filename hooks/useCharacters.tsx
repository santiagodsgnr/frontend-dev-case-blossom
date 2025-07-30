import { useDebounce } from "use-debounce";
import { useQuery } from "@apollo/client";
import GET_CHARACTERS from "../gql/getCharacters.gql";

export function useCharacters(search: string) {
  const [debouncedSearch] = useDebounce(search, 300);
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page: 1, filter: { name: debouncedSearch || undefined } },
  });

  const characters = data?.characters?.results;

  return { characters, loading, error };
}
