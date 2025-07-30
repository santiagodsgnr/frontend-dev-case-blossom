import type { Character } from "../types";

export const sortCharacters = (chars: Character[], sortOrder: string) => {
  return [...chars].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (sortOrder === "asc") return nameA.localeCompare(nameB);
    return nameB.localeCompare(nameA);
  });
};
