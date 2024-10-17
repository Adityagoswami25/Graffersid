import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import AddCompanyForm from "./AddCompanyForm";
import "../index.css";

const CitySelector = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between mx-auto w-[1000px] pb-[28px] border-b-gray-200">
        <div className="flex items-end gap-[22px]">
          <div className="flex flex-col space-y-2">
            <label htmlFor="city" className="text-gray-700 font-medium">
              Select City
            </label>
            <div className="relative">
              <select
                id="city"
                aria-label="Select City"
                className="px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 w-[413px]"
              >
                <option>Indore, Madhya Pradesh, India</option>
              </select>
              <FiMapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div>
            <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-purple-800">
              Find Company
            </button>
          </div>
        </div>

        <div className="flex items-end gap-[22px]">
          <div>
            <button
              onClick={toggleForm}
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-purple-800"
            >
              + Add Company
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="sort" className="text-gray-700 font-medium">
              Sort:
            </label>
            <select
              id="sort"
              aria-label="Sort options"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Name</option>
              <option>Rating</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
        {showForm && <AddCompanyForm onClose={toggleForm} />}
      </div>
    </>
  );
};

export default CitySelector;
