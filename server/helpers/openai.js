const { OpenAI } = require("openai");

const openAI = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-4o-mini",
    });
  
    return completion.choices[0].message.content;
  } catch (error) {
    return error
  }
};

module.exports = openAI;
