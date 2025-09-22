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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="mood" className="block text-sm font-bold text-gray-800 mb-2">
          What's your mood?
        </label>
        <input
          type="text"
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g., adventurous, thoughtful, lighthearted"
          className="w-full bg-white/50 border-2 border-white/60 rounded-md px-4 py-2 text-gray-800 placeholder-gray-600 focus:ring-purple-500 focus:border-purple-500 transition"
        />
      </div>
      <div>
        <label htmlFor="genres" className="block text-sm font-bold text-gray-800 mb-2">
          What genres do you enjoy?
        </label>
        <input
          type="text"
          id="genres"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          placeholder="e.g., sci-fi, comedy, fantasy"
          className="w-full bg-white/50 border-2 border-white/60 rounded-md px-4 py-2 text-gray-800 placeholder-gray-600 focus:ring-purple-500 focus:border-purple-500 transition"
        />
      </div>
      <div>
        <label htmlFor="likeThis" className="block text-sm font-bold text-gray-800 mb-2">
          Tell me something you liked recently.
        </label>
        <input
          type="text"
          id="likeThis"
          value={likeThis}
          onChange={(e) => setLikeThis(e.target.value)}
          placeholder="e.g., The Mandalorian, The Hitchhiker's Guide to the Galaxy"
          className="w-full bg-white/50 border-2 border-white/60 rounded-md px-4 py-2 text-gray-800 placeholder-gray-600 focus:ring-purple-500 focus:border-purple-500 transition"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || (!mood && !genres && !likeThis)}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed disabled:animate-none animate-button-colors animate-pulse-glow"
      >
        {isLoading ? 'Thinking...' : 'Get Recommendations'}
      </button>
    </form>
  );
};

export default InputForm;
