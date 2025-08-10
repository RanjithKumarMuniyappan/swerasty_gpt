// Install: npm install @google/genai

import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAGrxE45jfaxrreEDwEtuSh6seo-72FW1Q';
const USE_VERTEXAI = false;  // change to true if using Vertex AI
const PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION;

async function runChat() {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
    vertexai: USE_VERTEXAI,
    project: PROJECT,
    location: LOCATION,
  });

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',  // use your desired model
    contents: 'YOUR_USER_INPUT',
    generationConfig: {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    },
    // Note: safetySettings support isn’t documented in @google/genai as of now
  });

  console.log(response.text());
}

runChat().catch(console.error);
