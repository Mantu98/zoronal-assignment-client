import { Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
}

const Navbar = ({ search, setSearch }: NavbarProps) => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 h-28 flex items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity" >
          <div className="w-14 h-14 bg-purple-700 rounded-full flex items-center justify-center border-4 border-purple-100">
            <Star size={30} className="text-white" fill="currentColor" />
          </div>
          <div className="flex items-center gap-1.5 text-3xl font-extrabold tracking-tighter">
            <span className="text-purple-700">Review</span>
            <span className="text-gray-500">&RATE</span>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-xl border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-grow p-4 pl-6 text-lg outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button className="p-4 px-6 text-gray-400 border-l border-gray-200">
            <Search size={22} />
          </button>
        </div>

        {/* Desktop Right Links */}
        <div className="hidden md:flex items-center gap-8 text-xl font-medium text-gray-700">
          <a href="#" className="hover:text-purple-700 transition">
            SignUp
          </a>
          <a href="#" className="hover:text-purple-700 transition">
            Login
          </a>
        </div>

        {/* Mobile Header (Logo left, links right) */}
        <div className="md:hidden flex items-center gap-4 text-lg font-medium text-gray-700">
          <a href="#" className="hover:text-purple-700 transition">
            SignUp
          </a>
          <a href="#" className="hover:text-purple-700 transition">
            Login
          </a>
        </div>
      </div>

      {/* Mobile Search Bar (Below the main line) */}
      <div className="md:hidden px-6 pb-6">
        <div className="flex items-center w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-grow p-4 pl-6 text-lg outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button className="p-4 px-6 text-gray-400 border-l border-gray-200">
            <Search size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
