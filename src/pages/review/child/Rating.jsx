import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
export const Rating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      {" "}
      <div className="flex justify-center">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                className="hidden"
                value={ratingValue}
                onClick={() => {
                  setRating(ratingValue);
                  console.log(rating);
                }}
              />
              <FaStar
                onMouseOver={() => setHover(ratingValue)}
                onMouseOut={() => setHover(null)}
                size={40}
                className="transition-colors-200"
                color={ratingValue <= (hover || rating) ? "gold" : "grey"}
              />
            </label>
          );
        })}
        <div>
          {" "}
          <p>Rating value: {rating}</p>
        </div>
      </div>
    </div>
  );
};
