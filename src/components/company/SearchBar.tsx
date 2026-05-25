import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search size={18} className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 " />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search company..."
        className="w-fullpl-11pr-4py-3rounded-xlborderbg-whiteoutline-nonefocus:ring-2focus:ring-black"
      />
    </div>
  );
};

export default SearchBar;
