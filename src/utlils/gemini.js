import { GoogleGenerativeAI } from "@google/generative-ai";
const fs = require("fs");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });


export const convertoBuffer = (path, mimeType) => {
    return {
        inlineData: {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType
        },
      };
      
}


export const provideHealthlog = async (supportData , attachmentBuffer) => {
    const res = await model.generateContent([supportData,attachmentBuffer])
    const response = await res.response;
    const text = response.text();
    console.log(text);
}

export const createChat = async(prevChats , newMessage) => {
    const chat  = model.startChat({
        history : prevChats,
        generationConfig: {
            maxOutputTokens: 100,
        },
    });


    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}