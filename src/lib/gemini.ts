import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const analyzeQuizResults = async (answers: any) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Based on these quiz answers (including scenario-based ones), identify the user's top 3 skill categories and provide a percentage match for each. 
  
  CRITICAL: Also identify one "Hidden Talent" or "Unexpected Strength" based on the scenario-based answers (questions 11-15). This should be a unique insight that might not be obvious from direct questions.
  
  Finally, generate a 3-step learning roadmap for the top skill.
  
  Answers: ${JSON.stringify(answers)}
  
  Categories to consider: Coding, Design, Business, Communication, Analytical.
  
  Return the response in JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          scores: {
            type: Type.OBJECT,
            properties: {
              coding: { type: Type.NUMBER },
              design: { type: Type.NUMBER },
              business: { type: Type.NUMBER },
              communication: { type: Type.NUMBER },
              analytical: { type: Type.NUMBER },
            },
            required: ["coding", "design", "business", "communication", "analytical"],
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                percentage: { type: Type.NUMBER },
                description: { type: Type.STRING },
                roadmap: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      resources: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            title: { type: Type.STRING },
                            url: { type: Type.STRING },
                            type: { type: Type.STRING, enum: ["video", "course", "article"] },
                          },
                          required: ["title", "url", "type"],
                        },
                      },
                    },
                    required: ["title", "description", "resources"],
                  },
                },
              },
              required: ["skill", "percentage", "description", "roadmap"],
            },
          },
          hiddenTalent: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["title", "description"],
          },
        },
        required: ["scores", "recommendations", "hiddenTalent"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const getMentorResponse = async (history: { role: 'user' | 'model', text: string }[], message: string) => {
  const model = "gemini-3-flash-preview";
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: "You are an AI Career Mentor for youth. Your goal is to help them discover their talents and guide them on their learning journey. Be encouraging, practical, and insightful.",
    },
  });

  // We need to pass the history to the chat
  // But sendMessage only takes the message.
  // So we use generateContent for now or handle history manually.
  const response = await ai.models.generateContent({
    model,
    contents: [...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })), { role: 'user', parts: [{ text: message }] }],
  });

  return response.text;
};
