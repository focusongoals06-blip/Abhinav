import { GoogleGenAI, Type } from "@google/genai";
import type { Recommendation } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Removed non-standard 'enum' and 'required' properties from the response schema.
// The model is guided by the prompt and property descriptions instead.
const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "The title of the entertainment item." },
      type: { type: Type.STRING, description: "The type of entertainment. Must be one of: 'Movie', 'TV Show', 'Book', 'Game'." },
      year: { type: Type.INTEGER, description: "The year the item was released." },
      genres: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 2-3 relevant genres for the item.",
      },
      rating: {
        type: Type.NUMBER,
        description: "A rating out of 10, e.g., 8.5.",
      },
      short_description: {
        type: Type.STRING,
        description: "A brief, one or two sentence summary of the item.",
      },
      personalization_reason: {
        type: Type.STRING,
        description: "A detailed, 2-3 sentence explanation of why this specific recommendation fits the user's provided mood and preferences, written in an engaging and persuasive tone.",
      },
      poster_url: {
        type: Type.STRING,
        description: "A publicly accessible URL for the official poster or cover art of the item."
      },
    },
  },
};

export const getEntertainmentRecommendations = async (mood: string, genres: string, likeThis: string): Promise<Recommendation[]> => {
  const promptParts: string[] = [];
  if (mood) promptParts.push(`I'm in the mood for something ${mood}.`);
  if (genres) promptParts.push(`I enjoy these genres: ${genres}.`);
  if (likeThis) promptParts.push(`I recently enjoyed "${likeThis}" and want something similar.`);
  
  const prompt = `
    Act as an expert Entertainment Concierge. Please recommend 9 high-quality and diverse entertainment items (a mix of movies, TV shows, books, and video games) based on the following user preferences:
    ${promptParts.join(' ')}
    
    For each recommendation, provide all the requested information in the JSON schema. It is critically important that you find and include a valid, publicly accessible URL for its official poster or cover art in the 'poster_url' field. Do not use placeholder images. Ensure the personalization reason is compelling and directly relates to the user's input. The rating should be a realistic reflection of general critic/user consensus.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const recommendations = JSON.parse(jsonText);
    
    if (!Array.isArray(recommendations)) {
        throw new Error("AI response was not in the expected format.");
    }

    return recommendations as Recommendation[];

  } catch (error) {
    console.error("Error fetching recommendations from Gemini API:", error);
    throw new Error("Failed to get recommendations from the AI. The model may be overloaded or the request was invalid. Please try again later.");
  }
};