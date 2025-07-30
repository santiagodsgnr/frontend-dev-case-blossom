import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavorites = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const current = get().favorites;
        const exists = current.includes(id);
        set({
          favorites: exists
            ? current.filter((fav) => fav !== id)
            : [...current, id],
        });
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "favorites-storage",
    }
  )
);
