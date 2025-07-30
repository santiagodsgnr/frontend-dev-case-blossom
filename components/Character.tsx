import { Link, useParams, useSearchParams } from "react-router";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import AlertError from "../components/AlertError";
import GET_CHARACTER from "../gql/getCharacterByID.gql";
import LikeButton from "./LikeButton";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Character() {
  const isDesktop = useWindowSize();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const id = isDesktop ? searchParams.get("character") : params.id;

  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <Loading />;
  if (error) return <AlertError error={error} />;

  const character = data?.character;

  if (!character) {
    return (
      <section className="hidden md:flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-2xl px-8 py-6 max-w-md text-center border border-gray-200">
          <p className="text-xl text-gray-800">
            Frontend Dev Case by{" "}
            <span className="text-[#5A3696]">@santiagodvlpr</span>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-10/12 container mx-auto pt-8">
      <Link to="/" className="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8054C7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </Link>

      <div className="relative w-[75px] h-[75px] my-4">
        <img
          src={character.image}
          alt={character.name}
          className="rounded-full w-[75px] h-[75px]"
        />
        <div className="absolute bottom-[-5px] right-[-6px]">
          <LikeButton id={character.id} />
        </div>
      </div>

      <h1 className="font-bold text-2xl leading-[32px]">{character.name}</h1>

      <ul className="flex flex-col my-6 divide-y divide-[#E5E7EB]">
        <li className="h-[74px] py-4">
          <h2 className="font-bold text-[#111827]">Specie</h2>
          <p className="text-[#6B7280]">{character.species}</p>
        </li>
        <li className="h-[74px] py-4">
          <h2 className="font-bold text-[#111827]">Status</h2>
          <p className="text-[#6B7280]">{character.status}</p>
        </li>
        <li className="h-[74px] py-4">
          <h2 className="font-bold text-[#111827]">Gender</h2>
          <p className="text-[#6B7280]">{character.gender}</p>
        </li>
      </ul>
    </section>
  );
}
