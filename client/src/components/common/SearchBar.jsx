import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 w-full flex justify-center">
      <div className="flex items-center border-2 rounded-full border-gray-300 w-full md:w-2/5 max-w-md px-4 py-2 gap-2">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full focus:outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-full aspect-square flex items-center justify-center hover:bg-blue-600 transition duration-300"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;