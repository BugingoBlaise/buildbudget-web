import React from "react";
import { Rating } from "./Rating";
const API_URL = "http://localhost:8080/api/contractors";
// Modify ContractorCard.jsx to add reviews
export const ContractorCard = ({ contractor, rating }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-32 object-cover"
        // src={contractor.profilePic}
        src={`${API_URL}/image/${contractor.profilePic}`}
        alt={contractor.companyName}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{contractor.username}</div>
        <Rating rating={contractor.review.rating} />{" "}
        {/* Pass rating to the Rating component */}
        <p className="text-gray-600">{contractor.review.rating} out of 5</p>
      </div>
    </div>
  );
};
