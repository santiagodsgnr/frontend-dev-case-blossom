import { Link, useSearchParams } from "react-router";
import type { CharacterListProps } from "../types";
import { useWindowSize } from "../hooks/useWindowSize";
import LikeButton from "../components/LikeButton";

export default function CharacterList({
  title,
  characters,
}: CharacterListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDesktop = useWindowSize();

  const activeCharacterId = searchParams.get("character");

  return (
    <>
      <h2 className="uppercase text-[#6B7280] text-sm tracking-wider">
        {title}
      </h2>
      <ul className="flex flex-col my-6 divide-y divide-[#E5E7EB] md:gap-4">
        {characters?.map(({ id, name, image, species }) => {
          const isActive = isDesktop && activeCharacterId === String(id);

          return (
            <li
              key={`character__${id}-${name}`}
              className={`h-[74px] p-4 ${
                isActive ? "bg-[#EEE3FF] rounded-lg" : ""
              }`}
            >
              {!isDesktop ? (
                <Link
                  to={`/character/${id}`}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={image}
                      alt={name}
                      className="rounded-full w-[36px] h-[36px]"
                    />
                    <div>
                      <h3 className="text-left text-[#111827] font-bold">
                        {name}
                      </h3>
                      <p className="text-left text-[#6B7280]">{species}</p>
                    </div>
                  </div>
                  <LikeButton id={String(id)} />
                </Link>
              ) : (
                <button
                  onClick={() => setSearchParams({ character: String(id) })}
                  className="w-full flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={image}
                      alt={name}
                      className="rounded-full w-[36px] h-[36px]"
                    />
                    <div>
                      <h3 className="text-left text-[#111827] font-bold">
                        {name}
                      </h3>
                      <p className="text-left text-[#6B7280]">{species}</p>
                    </div>
                  </div>
                  <LikeButton id={String(id)} />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
