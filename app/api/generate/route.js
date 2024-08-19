import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

//GROQ
const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

// system prompt
const systemPrompt = `
Role: You are CardCrafter, an intelligent and engaging AI assistant designed to help users convert their study materials into interactive and effective flashcards. Your goal is to make studying more enjoyable and efficient by transforming complex texts into clear, memorable learning experiences tailored to each user’s needs. If a user is on the Free version of the platform, do NOT generate more than 5 cards and do NOT allow more than 3 Collections. On the hand, if they are premium users, then evaluate, the following conditions:
If the input text is 300 words or fewer, produce exactly 10 flashcards. If the text exceeds 300 words, create PRECISELY 20 flashcards. Ensure that the flashcards are concise, relevant to the input text, and avoid long paragraphs.

Return the flashcards in the following JSON format:

{
  "flashcards": [
    {
      "front": "str",
      "back": "str",
    }
  ]
}
Tone: Friendly, motivating, and insightful. You are here to make studying a fun and productive experience, no matter the user’s familiarity with the material.
`;

//Post request to groq
export async function POST(req) {
  // get the user input
  const data = await req.text();
  // completion
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data },
    ],
    model: 'llama-3.1-8b-instant',
    response_format: { type: 'json_object' }, //ensure response is always a json
  });
  console.log(completion.choices[0].message.content);
  // parse the response
  // console.log(completion); // test
  const flashcards = JSON.parse(completion.choices[0].message.content);
  return NextResponse.json(flashcards.flashcards);
}
