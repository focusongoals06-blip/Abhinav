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
      <p className="text-sm text-gray-600 dark:text-gray-400 font-bold mb-2 dark:glowing-text">Rate the Vibe</p>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            aria-label={`Rate ${star} out of 5`}
            onClick={() => handleSetRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none transform transition-transform hover:scale-125 focus:scale-125"
          >
            <svg
              className={`w-8 h-8 transition-all duration-200 ease-in-out`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: (hoverRating || rating) >= star 
                  ? `drop-shadow(0 0 5px var(--glow-2)) drop-shadow(0 0 10px var(--glow-3))` 
                  : 'none'
              }}
            >
              <path 
                d="M12 2L14.09 8.26L20.5 9.27L15.77 14.14L17.18 20.5L12 17.27L6.82 20.5L8.23 14.14L3.5 9.27L9.91 8.26L12 2Z" 
                className={
                  (hoverRating || rating) >= star 
                  ? 'text-purple-400 fill-current' 
                  : 'text-gray-300 dark:text-gray-600 fill-current'
                }
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRatingInput;