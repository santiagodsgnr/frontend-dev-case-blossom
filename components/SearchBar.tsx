import { useState } from "react";
import Filters from "../components/Filters";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {showFilters ? <Filters setShowFilters={setShowFilters} /> : null}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search or filter results"
        aria-label="Search characters"
        className="w-full p-2 pl-12 text-[#6B7280] bg-[#F3F4F6] rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-3 transform -translate-y-1/2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21 21-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>

      <button onClick={() => setShowFilters(!showFilters)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8054C7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="21" x2="14" y1="4" y2="4" />
          <line x1="10" x2="3" y1="4" y2="4" />
          <line x1="21" x2="12" y1="12" y2="12" />
          <line x1="8" x2="3" y1="12" y2="12" />
          <line x1="21" x2="16" y1="20" y2="20" />
          <line x1="12" x2="3" y1="20" y2="20" />
          <line x1="14" x2="14" y1="2" y2="6" />
          <line x1="8" x2="8" y1="10" y2="14" />
          <line x1="16" x2="16" y1="18" y2="22" />
        </svg>
      </button>
    </div>
  );
}
