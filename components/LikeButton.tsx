import { motion } from "framer-motion";
import { useFavorites } from "../store/useFavorite";

interface LikeButtonProps {
  id: string;
}

export default function LikeButton({ id }: LikeButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(String(id));
      }}
      className="bg-white  w-[32px] h-[32px] p-2 rounded-full cursor-pointer hover:bg-[#F3F4F6]"
    >
      <motion.svg
        key={isFavorite(String(id)) ? "filled" : "empty"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={isFavorite(String(id)) ? "#53C629" : "none"}
        stroke={isFavorite(String(id)) ? "#53C629" : "#D1D5E0"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </motion.svg>
    </button>
  );
}
