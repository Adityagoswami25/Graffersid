import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyCard from "./CompanyCard";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
       
        const response = await fetch(
          `http://localhost:5000/api/companies/${id}`
        );
        const data = await response.json();
        setCompany(data);
        
      } catch (error) {
        console.error("Failed to fetch company data", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${id}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchCompanyData();
    fetchReviews();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto">
        {company && (
          <div className="mb-6">
            <CompanyCard company={company} />
          </div>
        )}

        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="p-5 border-b border-gray-200">
                <div className="flex items-center mb-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt={review.fullName}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-semibold">{review.fullName}</h4>
                  </div>
                </div>
                <p className="mb-2">{review.reviewText}</p>
                <div className="flex">
                  {[...Array(5)].map((star, index) => (
                    <span
                      key={index}
                      className={`text-${
                        index < review.rating ? "yellow-400" : "gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
