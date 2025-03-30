import { getAIResponse, getPersonalizedSuggestions, generateSideQuests } from '@/backend/ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { journalEntries, type } = req.body;

    if (!journalEntries) {
      return res.status(400).json({ message: 'Journal entries are required' });
    }

    let response;
    switch (type) {
      case 'suggestions':
        response = await getPersonalizedSuggestions(journalEntries);
        break;
      case 'sidequests':
        response = await generateSideQuests(journalEntries);
        break;
      default:
        response = await getAIResponse(journalEntries);
    }

    res.status(200).json({ response });
  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ message: 'Error processing AI request' });
  }
} 