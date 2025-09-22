import React from 'react';

interface TrailerModalProps {
  trailerUrl: string;
  onClose: () => void;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  let videoId = '';
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1];
      } else {
        videoId = urlObj.searchParams.get('v') || '';
      }
    }
  } catch (error) {
    console.error("Invalid URL for YouTube parser:", url, error);
    // Attempt to find ID with regex as a fallback for non-standard URLs
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) {
        videoId = match[1];
    } else {
        return null;
    }
  }
  
  if (videoId) {
    const videoIdClean = videoId.split('&')[0];
    return `https://www.youtube.com/embed/${videoIdClean}?autoplay=1`;
  }
  
  return null;
};


const TrailerModal: React.FC<TrailerModalProps> = ({ trailerUrl, onClose }) => {
  const embedUrl = getYouTubeEmbedUrl(trailerUrl);

  if (!embedUrl) {
    // Silently fail if the URL is not a valid YouTube link to avoid crashing.
    // The button to open the modal wouldn't show for invalid data from the API anyway.
    return null; 
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-black p-1 md:p-2 rounded-lg shadow-2xl w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white text-black rounded-full h-8 w-8 md:h-10 md:w-10 flex items-center justify-center text-2xl font-bold z-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Close trailer"
        >
          &times;
        </button>
        <div className="aspect-video-container">
          <iframe
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;