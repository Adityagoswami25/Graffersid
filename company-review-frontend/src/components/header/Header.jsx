import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white shadow px-20 py-4 flex justify-between items-center w-full">
      <div className="flex items-center justify-between max-w-[1200px] w-full">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 flex items-center justify-center bg-purple-600 rounded-full">
            <span className="text-white text-2xl font-bold">R</span>
          </div>
          <h1 className="text-2xl font-bold">
            Review<span className="text-purple-600">&RATE</span>
          </h1>
        </div>

        <div className="flex items-center px-6 space-x-2 ml-auto">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="text-purple-600 hover:text-purple-800">
            <FiSearch className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="space-x-6">
        <button className="text-gray-700 hover:text-gray-900">SignUp</button>
        <button className="text-gray-700 hover:text-gray-900">Login</button>
      </div>
    </header>
  );
};

export default Header;
