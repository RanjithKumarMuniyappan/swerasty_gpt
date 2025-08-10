
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";

const API_KEY = "AIzaSyAGrxE45jfaxrreEDwEtuSh6seo-72FW1Q";

async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    // const safetySettings = [
    //     {
    //         category: HarmCategory.HAEM_CATEGORY_HARASSMENT,
    //         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //     },
    //     {
    //         category: HarmCategory.HAEM_CATEGORY_HATE_SPEECH,
    //         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //     },
    //     {
    //         category: HarmCategory.HAEM_CATEGORY_SEXUALLY_EXPLICIT,
    //         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //     },
    //     {
    //         category: HarmCategory.HAEM_CATEGORY_DANGEROUS_CONTENT,
    //         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    //     },
    // ];
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: []
    });

    try {
        console.log("MyPrompt : ", prompt);
        
        const result = await chat.sendMessage(prompt);
        const response = result.response;
        console.log(response.text());

        return response.text();
    }catch(e){
        console.log("ErrorAt : ", e.message);
        
    }
    
}

export default runChat;