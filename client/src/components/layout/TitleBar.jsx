import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import layoutConfig from "../../config/layoutConfig"; 

const TitleBar = ({ isSidebarOpen }) => {
  const location = useLocation();

  const getCurrentTitle = (pathname) => {
    const matchedItem = layoutConfig.find((item) => item.path === pathname);
    return matchedItem ? matchedItem.pageTitle : "Panel de Control";
  };

  const currentTitle = getCurrentTitle(location.pathname);

  return (
    <div
      className={`bg-gray-200 p-4 shadow-md flex items-center ${
        isSidebarOpen ? "ml-64" : "ml-16"
      } transition-all duration-300`}
    >
      <h2 className="text-2xl font-semibold text-gray-800 transition-opacity duration-300">
        {currentTitle}
      </h2>
    </div>
  );
};

TitleBar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default TitleBar;
