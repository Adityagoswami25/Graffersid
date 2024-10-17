import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ isOpen, onClose, company, reviews }) => {
  if (!isOpen) return null;

  const renderStars = (rating) => {
    return [...Array(5)].map((star, index) => (
      <FaStar
        key={index}
        className={`text-${index < rating ? "yellow-400" : "gray-300"}`}
        size={20}
      />
    ));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg">
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/100"
            alt="company-logo"
            className="w-24 h-24 rounded-md"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-500">{company.location}</p>
            <div className="flex items-center mt-1">
              <span className="text-lg font-bold">
                {company.averageRating.toFixed(1)}
              </span>
              {renderStars(company.averageRating)}
              <span className="text-gray-500 ml-2">
                ({company.reviewsCount} Reviews)
              </span>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        {reviews.map((review, index) => (
          <div key={index} className="p-5 border-b border-gray-200">
            <div className="flex items-center mb-3">
              <img
                src={review.imgSrc}
                alt={review.fullName || "Anonymous"}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h4 className="font-semibold">{review.fullName || "Anonymous"}</h4>
              </div>
            </div>
            <p className="mb-2">{review.reviewText}</p>
            <div className="flex">{renderStars(review.rating)}</div>
          </div>
        ))}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

ReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    averageRating: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
  }).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      reviewText: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      imgSrc: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ReviewModal;
