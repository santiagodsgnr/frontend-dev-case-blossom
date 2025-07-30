import { useState } from "react";
import { useSearchParams } from "react-router";
import { useCharacters } from "../hooks/useCharacters";
import useSearchCharacters from "../hooks/useSearchCharacters";
import { useWindowSize } from "../hooks/useWindowSize";
import { useFilteredCharacters } from "../hooks/useFilteredCharacters";
import SearchBar from "../components/SearchBar";
import CharacterList from "../components/CharacterList";
import AlertError from "../components/AlertError";
import Loading from "../components/Loading";
import { useFavorites } from "../store/useFavorite";
import type { Character } from "../types";
import CharacterView from "../components/Character";
import SortButton from "../components/SortButton";
import { sortCharacters } from "../utils/sortCharacters";

function App() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchParams] = useSearchParams();
  const isDesktop = useWindowSize();
  const { characters, loading, error } = useCharacters(search);

  const {
    characters: filteredFromParams,
    loading: loadingParams,
    error: errorParams,
  } = useFilteredCharacters(searchParams);

  const { favorites } = useFavorites();

  const favoriteCharacters = characters?.filter((c: Character) =>
    favorites?.includes(String(c.id))
  );

  const filteredFavorites = useSearchCharacters({
    search,
    characters: favoriteCharacters || [],
  });

  const filteredCharacters = useSearchCharacters({
    search,
    characters: characters || [],
  });

  const favoriteFilteredParams = filteredFromParams.filter((c: Character) =>
    favorites.includes(String(c.id))
  );

  const filteredSearchFromParams = useSearchCharacters({
    search,
    characters: filteredFromParams,
  });

  if ((loading && !isDesktop) || (loadingParams && isDesktop))
    return <Loading />;
  if (!isDesktop && error) return <AlertError error={error} />;
  if (isDesktop && errorParams) return <AlertError error={errorParams} />;

  return (
    <main className="md:h-screen md:fixed md:top-0 md:left-0 md:right-0">
      <section className="md:grid md:grid-cols-[400px__auto]">
        <section className="md:h-screen md:overflow-auto">
          <section className="max-w-10/12 container mx-auto">
            <h1 className="font-bold text-2xl leading-[32px] pt-8 pb-2">
              Rick And Morty List
            </h1>
            <div className="flex items-center gap-4 justify-between mt-4 mb-8">
              <SearchBar value={search} onChange={setSearch} />
              <SortButton setSortOrder={setSortOrder} sortOrder={sortOrder} />
            </div>
          </section>

          <section className="max-w-10/12 container mx-auto">
            {isDesktop ? (
              <>
                {searchParams.size > 1 ? (
                  <div className="hidden md:flex md:w-[90%] p-2 my-4 mx-auto items-center justify-between">
                    <span className="text-[#2563EB] font-bold">
                      {characters.length} results
                    </span>
                    <span className="rounded-xl bg-[#63D83833] text-[#3B8520] px-3">
                      1 filter
                    </span>
                  </div>
                ) : null}
                <CharacterList
                  title={`Starred Characters (${favoriteFilteredParams.length})`}
                  characters={sortCharacters(favoriteFilteredParams, sortOrder)}
                />
                <CharacterList
                  title={`Characters (${filteredSearchFromParams.length})`}
                  characters={sortCharacters(
                    filteredSearchFromParams,
                    sortOrder
                  )}
                />
              </>
            ) : (
              <>
                <CharacterList
                  title={`Starred Characters (${filteredFavorites.length})`}
                  characters={sortCharacters(filteredFavorites, sortOrder)}
                />
                <CharacterList
                  title={`Characters (${filteredCharacters.length})`}
                  characters={sortCharacters(filteredCharacters, sortOrder)}
                />
              </>
            )}
          </section>
        </section>
        <section className="shadow-xl">
          <CharacterView />
        </section>
      </section>
    </main>
  );
}

export default App;
