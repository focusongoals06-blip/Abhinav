import React, { useEffect, useState } from 'react';

const messages = [
  "Consulting the cinematic cosmos...",
  "Analyzing awesome adventures...",
  "Brewing up brilliant book suggestions...",
  "Unlocking legendary game lore...",
  "Curating your next obsession...",
  "Just a moment, finding something amazing..."
];

const LoadingSpinner: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-16 text-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-purple-600"></div>
      <p className="mt-6 text-lg font-bold text-gray-800 transition-opacity duration-500">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
