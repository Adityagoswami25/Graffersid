import { useState } from "react";
import PropTypes from "prop-types";
import ec1 from "../../assets/Ellipse3.png";
import ec2 from "../../assets/Ellipse4.png";

const AddReview = ({ company_id, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: 1,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.subject) newErrors.subject = "Subject is required.";
    if (!formData.reviewText) newErrors.reviewText = "Review text is required.";
    if (!formData.rating) newErrors.rating = "Rating is required.";
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
      const response = await fetch(
        `http://localhost:5000/api/reviews/${company_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Review added successfully!");
        onClose();
      } else {
        console.error("Failed to add review");
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
          &times;
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
          Add Review
        </h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2"
              style={{ color: "#959595" }}
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter full name"
              className="w-[360px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={errors.fullName ? "true" : "false"}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2"
              style={{ color: "#959595" }}
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter subject"
              className="w-[360px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={errors.subject ? "true" : "false"}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2"
              style={{ color: "#959595" }}
              htmlFor="reviewText"
            >
              Review Text
            </label>
            <textarea
              name="reviewText"
              id="reviewText"
              placeholder="Enter review text"
              className="w-[360px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              value={formData.reviewText}
              onChange={handleChange}
              aria-invalid={errors.reviewText ? "true" : "false"}
            />
            {errors.reviewText && (
              <p className="text-red-500 text-sm">{errors.reviewText}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block mb-2"
              style={{ color: "#959595" }}
              htmlFor="rating"
            >
              Rating
            </label>
            <select
              name="rating"
              id="rating"
              className="w-[360px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              value={formData.rating}
              onChange={handleChange}
              aria-invalid={errors.rating ? "true" : "false"}
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate} Star{rate > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
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

AddReview.propTypes = {
  company_id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddReview;
