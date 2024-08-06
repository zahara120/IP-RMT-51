const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini = async (ingredients) => {
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

    const prompt = `
      berikan resep sederhana dari bahan berikut: ${ingredients},
      berikan dalam bentuk json seperti ini:
      {
          "title": "",
          "description": "",
          "ingredients": ",
          "steps": "",
          "cookTime": (dalam detik),
          "viewsCount": (0-10000)
      }
    `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
};

module.exports = gemini;
