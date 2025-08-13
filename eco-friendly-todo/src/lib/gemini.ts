import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generativeModel = genAI ? genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
}) : null;

export const isGeminiConfigured = !!generativeModel;

export async function calculateQuizPoints(
  itemAnalyzed: string,
  userAnswer: string,
  correctAnswer: string,
  isCorrect: boolean
): Promise<number> {
  if (!isCorrect || !generativeModel) {
    return 0;
  }

  try {
    const prompt = `
You are a points calculator for an eco-friendly quiz app. Calculate points (1-100) for a correct answer based on:

Item analyzed: ${itemAnalyzed}
User's answer: ${userAnswer}
Correct answer: ${correctAnswer}

Points should be awarded based on:
- Complexity of the recycling process (simple = lower points, complex = higher points)
- Environmental impact (higher impact items = more points)
- Educational value (rare/unusual items = more points)
- Answer quality and detail

Return ONLY a number between 1 and 100. Examples:
- Basic items like plastic bottles: 15-25 points
- Complex items like electronics: 70-90 points
- Hazardous items requiring special handling: 85-100 points
- Common household items: 20-40 points

Points to award:`;

    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Extract number from response
    const points = parseInt(text.replace(/[^0-9]/g, ''));
    
    // Ensure points are within valid range
    return Math.max(1, Math.min(100, points || 25));
  } catch (error) {
    console.error('Error calculating quiz points:', error);
    // Return random points between 15-35 as fallback
    return Math.floor(Math.random() * 21) + 15;
  }
}
