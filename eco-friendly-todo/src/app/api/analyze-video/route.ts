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

    const prompt = `Analyze the video to identify the recyclable item. Provide a short description of the item, its material, and assign points for recycling it based on its material (e.g., plastic: 10, cardboard: 5, glass: 15, aluminum: 20). Also, provide the best and an easy way to recycle the item. The output should be in JSON format with the following structure: { "productName": "...", "description": "...", "material": "...", "points": ..., "bestRecyclingMethod": "...", "easyRecyclingMethod": "..." }`;

    const result = await generativeModel.generateContent([prompt, videoPart]);
    const response = await result.response;
    const text = await response.text();

    // Clean the text to ensure it's valid JSON
    const cleanedText = text.replace(/```json\n|\n```/g, '').trim();

    return NextResponse.json({ analysis: JSON.parse(cleanedText) });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to analyze video" },
      { status: 500 }
    );
  }
}
