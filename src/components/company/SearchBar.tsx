import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-gray-400
        "
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search company..."
        className="
        w-full
        pl-11
        pr-4
        py-3
        rounded-xl
        border
        bg-white
        outline-none
        focus:ring-2
        focus:ring-black
        "
      />
    </div>
  );
};

export default SearchBar;
