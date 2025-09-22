import React from 'react';

const InitialStateDisplay: React.FC = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-sm p-8 rounded-xl shadow-md border border-white/30">
        <svg className="mx-auto h-16 w-16 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Let's Find Your Vibe</h2>
        <p className="mt-2 text-gray-700 font-semibold">
          Tell me what you're in the mood for, genres you like, or something you've enjoyed, and I'll find your next favorite thing to watch, read, or play.
        </p>
      </div>
    </div>
  );
};

export default InitialStateDisplay;
