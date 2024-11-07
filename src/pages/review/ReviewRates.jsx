import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { ContractorCard } from "./child/ContractorCard";

const API_URL = "http://localhost:8080/api/contractors";

export const ReviewRates = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contractors, setContractors] = useState([]);
  const fetchContractors = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setContractors(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
      setError("Failed to load contractors");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContractors();
  }, [fetchContractors]);
  if (isLoading)
    return (
      <div className="flex justify-center items-center p-8">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-whiteTheme-primaryColor border-r-transparent align-[-0.125em]"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contractors.map((contractor) => (
        <ContractorCard key={contractor.id} contractor={contractor} />
      ))}
    </div>
  );
};
