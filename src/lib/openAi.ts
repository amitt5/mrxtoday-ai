import OpenAI from "openai";

// Replace with your OpenAI API key
const OPENAI_API_KEY = "your_api_key_here";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

interface Question {
  id: number;
  text: string;
  type: "single_choice" | "multiple_choice" | "text" | "number";
  options?: string[];
  logic?: { condition: string; skip_to: number }[];
}

interface Questionnaire {
  questions: Question[];
}

export async function convertQuestionnaireToJson(questionnaireText: string): Promise<Questionnaire> {
  const prompt = `Convert the following questionnaire into structured JSON format. 
  Identify questions, answer types (single_choice, multiple_choice, text, number, etc.), 
  options (if applicable), and skip logic if mentioned.

  Questionnaire:
  ${questionnaireText}

  JSON Output:`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an expert in structuring questionnaires into JSON." },
      { role: "user", content: prompt }
    ]
  });

  const jsonOutput = response.choices[0].message?.content?.trim() || "{}";
  return JSON.parse(jsonOutput);
}

// Example questionnaire input
const questionnaireText = `
1. What is your age?
   a) 18-24
   b) 25-34
   c) 35-44
   d) 45+

2. Do you own a car?
   a) Yes
   b) No

3. What brand is your car? (Only answer if you selected Yes for Q2)
`;

// Convert questionnaire to JSON
convertQuestionnaireToJson(questionnaireText).then(jsonOutput => {
  console.log(JSON.stringify(jsonOutput, null, 2));
}).catch(console.error);
