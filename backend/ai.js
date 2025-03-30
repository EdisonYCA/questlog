import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Function to get AI response for journal entries
export const getAIResponse = async (journalEntries) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.0-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant analyzing journal entries. Provide insights, patterns, and suggestions based on the entries."
        },
        {
          role: "user",
          content: `Here are my journal entries: ${JSON.stringify(journalEntries)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw error;
  }
};

// Function to get personalized suggestions based on journal entries
export async function getPersonalizedSuggestions(journalEntries, currentQuests = []) {
  try {
    // If there are already 3 or more quests, don't generate new ones
    if (currentQuests.length >= 3) {
      return { quests: [] };
    }

    const prompt = `Based on the following journal entries, generate 1 personalized quest that would help the user achieve their goals. The quest should be specific, actionable, and aligned with the user's interests and goals.

IMPORTANT FORMATTING RULES:
1. Quest title MUST be 30-40 characters long
2. Quest description MUST be 80-100 characters long
3. Quest MUST have a timeframe in the format "HH:MMAM-HH:MMPM"
4. Quest MUST have a reward value between 100-500 DATA FRAGMENTS

Journal Entries:
${journalEntries.map(entry => `- ${entry.title}: ${entry.body}`).join('\n')}

Generate exactly 1 quest in the following JSON format:
{
  "quests": [
    {
      "title": "30-40 character title",
      "description": "80-100 character description",
      "timeframe": "HH:MMAM-HH:MMPM",
      "reward": "number between 100-500 DATA FRAGMENTS"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a personal development AI assistant. Based on the journal entires, provide main quests that most align with the users usual task
          Format each quest as a JSON object with the following structure:
            {
                "title": "Quest title",
                "description": "Detailed quest description",
                "reward": "Reward description (e.g., '50 DATA FRAGMENTS')"
                "time": "Time to complete quest (e.g., '1 hour', '30 minutes')"
                "difficulty": "Main quest or side quest"
            }
          Return an array of these quest objects.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Parse the response to ensure it's valid JSON
    const suggestions = JSON.parse(completion.choices[0].message.content);
    return suggestions;
  } catch (error) {
    console.error("Error getting personalized suggestions:", error);
    throw error;
  }
}

// Function to generate side quests based on journal entries
export const generateSideQuests = async (journalEntries, completeQuests) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.0-mini",
      messages: [
        {
          role: "system",
          content: `You are a quest-generating AI assistant. Based on the user's journal entries and the quests they have completed, generate 3-5 personalized side quests that would help them achieve their goals or address their challenges. 
          Format each quest as a JSON object with the following structure:
          {
            "title": "Quest title",
            "description": "Detailed quest description",
            "reward": "Reward description (e.g., '50 DATA FRAGMENTS')"
            "time": "Time to complete quest (e.g., '1 hour', '30 minutes')"
            "difficulty": "Main quest or side quest"
          }
          Return an array of these quest objects.`
        },
        {
          role: "user",
          content: `Based on these journal entries, generate personalized side quests: ${JSON.stringify(journalEntries)} and completed quests: ${JSON.stringify(completeQuests)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Parse the response to ensure it's valid JSON
    const quests = JSON.parse(completion.choices[0].message.content);
    return quests;
  } catch (error) {
    console.error("Error generating side quests:", error);
    throw error;
  }
};

export const BuildSchedule = async (activeQuests, sideQuests) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4.0-mini",
            messages: [
                {
                    role: "system",
                    content: `You are an efficiency optimizer AI. You are tasked with optimizing a schedule based on what is found in
                    in the passed activeQuests and sideQuests, where activeQuests (main quests) must be prioritized over sideQuests on the schedule. In the format of a JSON object that looks like the following:
                    {
                        "schedule": [
                            {
                                "day": "Day of the week",
                                "quests": ["Quest 1", "Quest 2", etc.]
                                "time": [Time to complete Quest1, Time to complete Quest2, etc.]
                                "priority": [Main quest or side quest]
                            }
                        ]
                    }
                    return an array of these objects.`
                },
                {
                    role: "user",
                    content: `Create me a schedule based on activeQuests: ${JSON.stringify(activeQuests)} and sideQuests: ${JSON.stringify(sideQuests)}`
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });
  
        // Parse the response to ensure it's valid JSON
        const quests = JSON.parse(completion.choices[0].message.content);
        return quests;
    } catch (error) {
        console.error("Error generating side quests:", error);
        throw error;
    }
};