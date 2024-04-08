import { GoogleGenerativeAI } from "@google/generative-ai";
import { useQuery } from "@tanstack/react-query";
import { Spinner, YStack } from "tamagui";

import CustomMarkdown from "./CustomMarkdown";
import Error from "./Error";
import { MyScroll } from "./MyScroll";
import PostNotice from "./PostNotice";

interface IAIGeneratedAnswer {
  questionMarkdown: string;
}

const AIGeneratedAnswer = (props: IAIGeneratedAnswer) => {
  const { questionMarkdown } = props;

  const disclaimer =
    "The following answer is AI-generated and may not be entirely accurate. Please use discretion when interpreting the information.";

  const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const generateAnswer = async () => {
    const prompt = `You are an experienced developer tasked with generating an answer in markdown format based on a given question. Here is the prompt: '${questionMarkdown}'. Please proceed to generate the answer in markdown.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  };

  const {
    data: answer,
    isFetching,
    error,
    refetch
  }: {
    data: string;
    isFetching: boolean;
    error: Error;
    refetch: () => void;
  } = useQuery({
    queryKey: ["aiAnswerData"],
    queryFn: generateAnswer
  });

  if (isFetching)
    return (
      <Spinner
        size="large"
        color="$green10"
      />
    );

  if (error) return <Error refetch={refetch} />;

  return (
    <MyScroll>
      <YStack
        paddingHorizontal={10}
        paddingVertical={15}
        gap={15}
      >
        <PostNotice body={disclaimer} />

        <CustomMarkdown>{answer}</CustomMarkdown>
      </YStack>
    </MyScroll>
  );
};

export default AIGeneratedAnswer;
