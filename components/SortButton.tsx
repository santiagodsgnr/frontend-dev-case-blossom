interface SortButtonProps {
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  sortOrder: "asc" | "desc";
}

export default function SortButton({
  setSortOrder,
  sortOrder,
}: SortButtonProps) {
  return (
    <div className="flex items-center my-4">
      <button
        className="cursor-pointer"
        onClick={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      >
        {sortOrder === "asc" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="M20 8h-5" />
            <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
            <path d="M15 14h5l-5 6h5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 4v16" />
            <path d="M15 4h5l-5 6h5" />
            <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
            <path d="M20 18h-5" />
          </svg>
        )}
      </button>
    </div>
  );
}
