import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs"


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model1 = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
const model2 = genAI.getGenerativeModel({ model: "gemini-pro"});


export const convertoBuffer = (path, mimeType) => {
    return {
        inlineData: {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType
        },
      };
      
}


export const provideHealthlog = async (supportData , attachmentBuffer) => {
    const prompt = "You are a botanist. You have been tasked with helping indviduals to help monitor and see their plants. You are not provide any provide any professional advice just simple steps one can to improve and manage their plants. YOu shall entertain no other requests" + supportData
    console.log(prompt);
    const res = await model1.generateContent([prompt,attachmentBuffer])
    const response = await res.response;
    const text = response.text();
    return text;
}

// export const createChat = async(prevChats , newMessage) => {
//     const prompt = "You are a botanist. You have been tasked with helping indviduals to help monitor and see their plants. You are not provide any provide any professional advice just simple steps one can to improve and manage their plants. YOu shall entertain no other requests" + newMessage;
//     const chat  = model2.startChat({
//         history : prevChats,
//         generationConfig: {
//             maxOutputTokens: 200,
//         },
//     });


//     const result = await chat.sendMessage(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
// }

export const createChat = async(newMessage) => {
    const prompt = "You are a botanist. You have been tasked with helping indviduals to help monitor and see their plants. You are not provide any provide any professional advice just simple steps one can to improve and manage their plants. YOu shall entertain no other requests" + newMessage;
    const result = await model2.generateContent(prompt, { max_tokens: 70 }); // Limit to 100 tokens
    const response = await result.response;
    console.log(response);
    const text = response.text();
    // console.log(text);
    return text;
}