import type { Character } from "../types";

interface Props {
  characters: Character[];
  search: string;
}

export default function useSearchCharacters({ characters, search }: Props) {
  const filtered = characters?.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return filtered;
}
