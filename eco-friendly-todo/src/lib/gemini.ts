import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generativeModel = genAI ? genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
}) : null;

export const isGeminiConfigured = !!generativeModel;
