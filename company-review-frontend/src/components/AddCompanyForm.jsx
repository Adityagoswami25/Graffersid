import { useState } from "react";
import PropTypes from "prop-types";
import ec1 from "../assets/Ellipse3.png";
import ec2 from "../assets/Ellipse4.png";

const AddCompanyForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    foundedOn: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "location" && value) {
      fetchCitySuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchCitySuggestions = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/autocomplete.php?key=pk.e8112e6a3f3075c435270066a1db7a4f&q=${query}&limit=10&format=json`
      );
      const data = await response.json();
      setSuggestions(data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Company name is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.foundedOn) newErrors.foundedOn = "Founded date is required.";
    if (!formData.city) newErrors.city = "City is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Company added successfully!");
        onClose();
      } else {
        console.error("Failed to add company");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-[24px] shadow-lg w-full max-w-md relative">
        <div
          className="absolute top-[16px] right-[20px] text-2xl cursor-pointer "
          onClick={onClose}
        >
          &times;{" "}
        </div>
        <img
          src={ec2}
          alt="ec2"
          className="absolute top-0 left-0 rounded-md rotate-360 z-20"
        />
        <img
          src={ec1}
          alt="ec1"
          className="absolute top-0 left-0 rounded-md rotate-360 z-10"
        />

        <h2
          className="mb-4 text-center mt-[70px]"
          style={{ fontSize: "24px", fontWeight: 600 }}
        >
          Add Company
        </h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2"
              style={{ color: "#959595" }}
              htmlFor="name"
            >
              Company Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter..."
              className="w-[360px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2"
              style={{ color: "#959595" }}
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Type location..."
              className="w-[360px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              value={formData.location}
              onChange={handleChange}
              aria-invalid={errors.location ? "true" : "false"}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
            {isLoading && <p>Loading...</p>}
            {suggestions.length > 0 && (
              <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        location: suggestion.display_name,
                      });
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2"
              style={{ color: "#959595" }}
              htmlFor="foundedOn"
            >
              Founded On
            </label>
            <input
              type="date"
              name="foundedOn"
              id="foundedOn"
              className="w-[360px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              value={formData.foundedOn}
              onChange={handleChange}
              aria-invalid={errors.foundedOn ? "true" : "false"}
            />
            {errors.foundedOn && (
              <p className="text-red-500 text-sm">{errors.foundedOn}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block mb-2"
              style={{ color: "#959595" }}
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              className="w-[360px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              value={formData.city}
              onChange={handleChange}
              aria-invalid={errors.city ? "true" : "false"}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-24 bg-gradient-to-r from-[#d101f3] to-[#1f25cc] text-white font-bold py-2 px-4 rounded-lg hover:from-[#b100d2] hover:to-[#1a1f9f]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddCompanyForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddCompanyForm;
