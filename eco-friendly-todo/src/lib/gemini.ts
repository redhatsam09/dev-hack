import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
