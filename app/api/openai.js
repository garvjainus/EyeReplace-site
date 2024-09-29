// pages/api/openai.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: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, // Ensure this is correctly set in .env.local
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const completion = await openai.createCompletion({
        model: 'gpt-4', // Ensure you're using GPT-4 or GPT-3.5
        prompt: `Create a challenging multiple-choice question about the word "${prompt}" with four distinct options. Provide a correct answer and three incorrect options. Also, provide a definition for the word.`,
        max_tokens: 300,
        temperature: 0.7, // Encourage variety in responses
      });

      const generatedText = completion.data.choices[0].text.trim();
      // Assuming OpenAI responds with the question, definition, and options in a readable format
      const [question, definition, ...choices] = generatedText.split('\n').filter(Boolean);

      res.status(200).json({
        question,
        definition,
        choices: choices.slice(0, 4), // Ensure only 4 choices are used
      });
    } catch (error) {
      console.error('Error with OpenAI request:', error);
      res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
