import { useState, useEffect } from "react";
import axios from "axios";
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/companies");

        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <p className="text-gray-700 font-semibold mb-2">
        Results Found: {companies.length}
      </p>
      {companies.length > 0 ? (
        companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            showDetailReviewButton={true}
          />
        ))
      ) : (
        <p>No companies available.</p>
      )}
    </div>
  );
};

export default CompanyList;
