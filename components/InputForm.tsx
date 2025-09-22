import React, { useState } from 'react';

interface InputFormProps {
  onGetRecommendations: (mood: string, genres: string, likeThis: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onGetRecommendations, isLoading }) => {
  const [mood, setMood] = useState('');
  const [genres, setGenres] = useState('');
  const [likeThis, setLikeThis] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetRecommendations(mood, genres, likeThis);
  };

  const handleSurpriseMe = () => {
    setMood('');
    setGenres('');
    setLikeThis('');
    onGetRecommendations('surprise-me', '', '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="mood" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 dark:glowing-text">
          What's your mood?
        </label>
        <input
          type="text"
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g., adventurous, thoughtful, lighthearted"
          className="w-full bg-white/50 dark:bg-gray-700/50 border-2 border-transparent focus:border-purple-400 dark:focus:border-purple-500 rounded-md px-4 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 transition duration-300 shadow-inner"
        />
      </div>
      <div>
        <label htmlFor="genres" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 dark:glowing-text">
          What genres do you enjoy?
        </label>
        <input
          type="text"
          id="genres"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          placeholder="e.g., sci-fi, comedy, fantasy"
          className="w-full bg-white/50 dark:bg-gray-700/50 border-2 border-transparent focus:border-purple-400 dark:focus:border-purple-500 rounded-md px-4 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 transition duration-300 shadow-inner"
        />
      </div>
      <div>
        <label htmlFor="likeThis" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 dark:glowing-text">
          Tell me something you liked recently.
        </label>
        <input
          type="text"
          id="likeThis"
          value={likeThis}
          onChange={(e) => setLikeThis(e.target.value)}
          placeholder="e.g., The Mandalorian, The Hitchhiker's Guide to the Galaxy"
          className="w-full bg-white/50 dark:bg-gray-700/50 border-2 border-transparent focus:border-purple-400 dark:focus:border-purple-500 rounded-md px-4 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 transition duration-300 shadow-inner"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          type="button"
          onClick={handleSurpriseMe}
          disabled={isLoading}
          className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 py-3 px-4 rounded-lg shadow-lg text-lg font-bold focus:outline-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:saturate-50 glowing-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Surprise Me!</span>
        </button>
        <button
          type="submit"
          disabled={isLoading || (!mood && !genres && !likeThis)}
          className="w-full sm:w-auto flex-grow py-3 px-4 rounded-lg shadow-lg text-lg font-bold focus:outline-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:saturate-50 glowing-button"
        >
          <span>{isLoading ? 'Thinking...' : 'Get Recommendations'}</span>
        </button>
      </div>
    </form>
  );
};

export default InputForm;