import { generativeModel } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { video } = await req.json();

    if (!video) {
      return NextResponse.json(
        { error: "Video data is required" },
        { status: 400 }
      );
    }

    const videoPart = {
      inlineData: {
        data: video,
        mimeType: "video/mp4",
      },
    };

    const prompt = `Analyze the video to identify the recyclable item. Provide a short description of the item, its material, and points for recycling it correctly. Then, create a multiple-choice question with 4 options on how to recycle it. The options must include:
1. The single best, most effective recycling method.
2. An easier, but still correct, recycling method.
3. Two plausible but incorrect recycling methods.

IMPORTANT: Your response MUST be only the JSON object, without any surrounding text, explanations, or markdown formatting. The JSON object must be valid and follow this exact structure: { "productName": "...", "description": "...", "material": "...", "pointsForCorrect": number, "question": "...", "options": ["...", "...", "...", "..."], "correctAnswers": { "best": "...", "easy": "..." } }`;

    const result = await generativeModel.generateContent([prompt, videoPart]);
    const response = await result.response;
    const text = await response.text();

    // Log the raw response from the AI for debugging
    console.log("Raw AI Response:", text);

    // Find the JSON object within the response text
    const jsonMatch = text.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON object found in the AI response.");
    }

    const jsonString = jsonMatch[0];
    const analysisData = JSON.parse(jsonString);

    return NextResponse.json({ analysis: analysisData });
  } catch (error) {
    console.error("Error analyzing video:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    
    return NextResponse.json(
      { error: "Failed to analyze video. The AI model may have returned an invalid format.", details: errorMessage },
      { status: 500 }
    );
  }
}
