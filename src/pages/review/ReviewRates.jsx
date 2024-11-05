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
      <div>
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div
          className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
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
