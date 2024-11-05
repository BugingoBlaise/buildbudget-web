import React from "react";
import { FaStar } from "react-icons/fa6";

export const Rating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <FaStar
            key={i}
            size={20}
            color={ratingValue <= rating ? "gold" : "grey"} // Conditional coloring based on rating
          />
        );
      })}
    </div>
  );
};
