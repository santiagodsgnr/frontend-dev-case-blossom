export interface CharacterListProps {
  title: string;
  characters: Character[];
}

export interface FilteredCharactersProps {
  search: string;
  characters: Character[];
}

export type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type?: string;
};
