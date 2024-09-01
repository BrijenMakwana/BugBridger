import { GoogleGenerativeAI } from "@google/generative-ai";
import { useQuery } from "@tanstack/react-query";

const useAI = (prompt: string) => {
  const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const generateContent = async (): Promise<string> => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  };

  return useQuery({
    queryKey: [prompt],
    queryFn: generateContent
  });
};

export default useAI;
