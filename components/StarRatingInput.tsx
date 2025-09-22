import React, { useState, useEffect } from 'react';
import { getRatingForTitle, saveRatingForTitle } from '../utils/ratingStore';

interface StarRatingInputProps {
  title: string;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ title }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  useEffect(() => {
    const savedRating = getRatingForTitle(title);
    if (savedRating !== null) {
      setRating(savedRating);
    }
  }, [title]);

  const handleSetRating = (newRating: number) => {
    const finalRating = rating === newRating ? 0 : newRating; // Allow un-setting rating
    setRating(finalRating);
    saveRatingForTitle(title, finalRating);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-gray-600 font-bold mb-2">Your Rating</p>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            aria-label={`Rate ${star} stars`}
            onClick={() => handleSetRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none transform transition-transform hover:scale-125"
          >
            <svg
              className={`w-7 h-7 transition-colors duration-200 ${
                (hoverRating || rating) >= star ? 'text-yellow-500' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.06 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRatingInput;
