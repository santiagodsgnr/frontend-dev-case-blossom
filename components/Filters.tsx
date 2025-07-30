import { useState } from "react";
import { useSearchParams } from "react-router";
import { filterOptions } from "../constants/index";
import CharacterList from "./CharacterList";
import { useFilteredCharacters } from "../hooks/useFilteredCharacters";
import { useWindowSize } from "../hooks/useWindowSize";
import Loading from "./Loading";
import AlertError from "./AlertError";
import { useFavorites } from "../store/useFavorite";
import type { Character } from "../types";

interface FiltersProps {
  setShowFilters: (value: boolean) => void;
}

const groupedFilters = filterOptions.reduce((acc, curr) => {
  acc[curr.type] = acc[curr.type] || [];
  acc[curr.type].push(curr.value);
  return acc;
}, {} as Record<string, string[]>);

export default function Filters({ setShowFilters }: FiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState(false);
  const { characters, loading, error } = useFilteredCharacters(searchParams);
  const isDesktop = useWindowSize();
  const { favorites } = useFavorites();

  const favoriteCharacters = characters.filter((character: Character) =>
    favorites.includes(String(character.id))
  );

  const handleClick = (type: string, value: string) => {
    const newParams = new URLSearchParams();
    newParams.set("characters", "all");
    newParams.set(type, value);
    setSearchParams(newParams);
  };

  const handleClose = () => {
    setSearchResult(false);
    setSearchParams();
    if (searchParams.size === 0) {
      setShowFilters(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <AlertError error={error} />;

  return (
    <section className="w-full mx-auto h-svh bg-white fixed z-10 left-0 top-0 md:absolute md:max-w-[343px] md:h-[auto] md:shadow-lg md:top-[50px] md:rounded-xl md:border-[1px] md:border-gray-200">
      <div className="max-w-10/4 p-4 mx-auto flex items-center justify-start md:hidden">
        <button onClick={handleClose} className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8054C6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>
        <h1 className="text-center font-bold flex-1/4 md:hidden">
          {searchResult && characters.length > 1
            ? "Advanced Search"
            : "Filters"}
        </h1>
        {searchResult && characters.length > 1 ? (
          <button
            onClick={() => {
              setShowFilters(false);
              setSearchParams();
            }}
            className="text-[#8054C7] font-bold md:hidden"
          >
            Done
          </button>
        ) : null}
      </div>

      {!isDesktop && searchResult && characters.length > 1 ? (
        <>
          <div className="w-[90%] p-4 my-6 mx-auto flex items-center justify-between border-y-[1px] border-[#E5E7EB] md:hidden">
            <span className="text-[#2563EB] font-bold">
              {favoriteCharacters.length + characters.length} results
            </span>
            <span className="rounded-xl bg-[#63D83833] text-[#3B8520] px-3">
              1 filter
            </span>
          </div>
          <section className="max-w-10/4 p-4 mx-auto max-h-[90svh] overflow-auto md:hidden">
            {favoriteCharacters.length > 0 && (
              <CharacterList
                title={`Starred Characters (${favoriteCharacters.length})`}
                characters={favoriteCharacters}
              />
            )}
            <CharacterList
              title={`All Characters (${characters.length})`}
              characters={characters}
            />
          </section>
        </>
      ) : (
        <>
          {Object.entries(groupedFilters).map(([type, values]) => (
            <div
              key={type}
              className="max-w-10/4 p-4 pt-0 mx-auto md:mt-4 md:pb-0"
            >
              <h3 className="text-[#6B7280] capitalize">{type}</h3>
              <div className="w-full grid grid-cols-3 my-4 gap-2">
                {values.map((value) => {
                  const isActive = searchParams.get(type) === value;
                  return (
                    <button
                      key={value}
                      className={`p-3 rounded-xl border text-sm capitalize cursor-pointer ${
                        isActive
                          ? "bg-[#EEE3FF] text-[#8054C7] border-0 font-bold"
                          : "border-[#E5E7EB] text-gray-700"
                      }`}
                      onClick={() => handleClick(type, value)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="p-4 md:pt-0 md:pb-4 md:px-4">
            <button
              className="p-3 bg-[#8054C7] text-white rounded-xl w-full  md:rounded-lg"
              onClick={() => {
                if (isDesktop) {
                  setShowFilters(false);
                } else {
                  setSearchResult(true);
                }
              }}
            >
              Filter
            </button>
          </div>
        </>
      )}
    </section>
  );
}
