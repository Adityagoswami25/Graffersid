import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import logo from "../../assets/logo1.PNG";
import AddReview from "./AddReview";

const CompanyCard = ({ company, showDetailReviewButton }) => {
  const { _id, name, location, foundedOn } = company;
  // eslint-disable-next-line no-unused-vars
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!_id) return;
      try {
        const response = await fetch(
          `http://localhost:5000/api/reviews/${_id}`
        );
        const data = await response.json();
        setReviews(data);
        calculateAverageRating(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [_id]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      setReviewsCount(0);
      return;
    }

    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    const avgRating = total / reviews.length;
    setAverageRating(avgRating);
    setReviewsCount(reviews.length);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" size={20} />);
    }

    if (halfStar) {
      stars.push(
        <FaStar
          key={fullStars}
          className="text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
          size={20}
        />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <FaStar key={stars.length} className="text-gray-300" size={20} />
      );
    }

    return stars;
  };

  return (
    <>
      <div className="flex py-[21px] px-[19px] bg-white rounded-md justify-between items-center w-[1000px] gap-5">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={logo}
              alt={name}
              className="w-[100px] h-[100px] rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-500 text-sm">{location}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span>
                {averageRating.toFixed(1)} ({reviewsCount} Reviews)
              </span>
              {renderStars()}
            </div>
          </div>
        </div>

        <div className="text-right flex flex-col justify-between h-full gap-[40px]">
          <p className="text-gray-500 text-sm">
            Founded: {new Date(foundedOn).toLocaleDateString()}
          </p>

          {showDetailReviewButton ? (
            <button
              onClick={() => navigate(`/companies/${_id}`)}
              className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
            >
              Detail Review
            </button>
          ) : (
            <button
              onClick={toggleForm}
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-purple-800"
            >
              Add Review
            </button>
          )}
        </div>
        {showForm && (
          <AddReview company_id={company._id} onClose={toggleForm} />
        )}
      </div>
    </>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    foundedOn: PropTypes.string.isRequired,
  }).isRequired,
  showDetailReviewButton: PropTypes.bool,
};

export default CompanyCard;
