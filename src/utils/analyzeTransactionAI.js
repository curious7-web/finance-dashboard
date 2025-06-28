export const analyzeTransaction = async (description, amount, type) => {
const token = process.env.HUGGINGFACE_TOKEN;
  const prompt = `This is a financial transaction. Description: "${description}", Amount: ${amount}, Type: ${type}.
Suggest the most suitable category from [Food, Transport, Salary, Utilities, Shopping, Healthcare, Investment, Education, Other] and give a helpful tag.
Reply in JSON format like: {"category": "...", "tag": "..."}`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hf_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await response.json();
    const text = data?.[0]?.generated_text;
    const match = text?.match(/\{.*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (error) {
    console.error("AI Analysis Error:", error);
  }

  return { category: "Other", tag: "" };
};
