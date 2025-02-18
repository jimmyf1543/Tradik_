import { Link } from "react-router-dom";
import { LuCircleChevronRight, LuCircleChevronLeft } from "react-icons/lu";
import { FaFileExcel } from "react-icons/fa";
import PropTypes from "prop-types";
import layoutConfig from "../../config/layoutConfig";
import generateExcel from "../../utils/DownloadExcell";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const handleGenerateExcel = () => {
    if (generateExcel) {
      generateExcel();
    }
  };
  return (
    <div
      className={`bg-[#f3f7fc] text-gray-800 fixed h-full ${
        isOpen ? "w-64" : "w-16"
      } transition-width duration-300 flex flex-col z-50`}
    >
      <button
        className="flex items-center space-x-2 hover:bg-blue-200 p-2 rounded justify-center mt-3 text-xl"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <LuCircleChevronLeft className="text-xl text-gray-800" />
        ) : (
          <LuCircleChevronRight className="text-xl text-gray-800" />
        )}
      </button>

      <nav className="flex flex-col space-y-4 p-4">
        {layoutConfig.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center space-x-2 hover:bg-blue-200 p-2 rounded"
          >
            {item.icon}
            {isOpen && (
              <span
                className={`text-sm transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.title}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <button
          className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
          onClick={handleGenerateExcel}
        >
          <FaFileExcel className="text-lg" />
          {isOpen && <span className="text-sm">Generar Excel</span>}
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
