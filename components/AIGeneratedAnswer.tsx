import { GoogleGenerativeAI } from "@google/generative-ai";
import { Info } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Spinner, Text, YStack } from "tamagui";

import CustomMarkdown from "./CustomMarkdown";
import Error from "./Error";
import { MyScroll } from "./MyScroll";

interface IAIGeneratedAnswer {
  questionMarkdown: string;
}

const AIDisclaimer = () => {
  return (
    <Card
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap={10}
      theme="pink"
      padding={15}
    >
      <Info />

      <Text
        fontSize={15}
        flex={1}
        lineHeight={22}
      >
        The following answer is AI-generated and may not be entirely accurate.
        Please use discretion when interpreting the information.
      </Text>
    </Card>
  );
};

const AIGeneratedAnswer = (props: IAIGeneratedAnswer) => {
  const { questionMarkdown } = props;

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
    error
  }: {
    data: string;
    isFetching: boolean;
    error: Error;
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

  if (error) return <Error />;

  return (
    <MyScroll>
      <YStack
        paddingHorizontal={10}
        paddingVertical={15}
        gap={10}
      >
        <AIDisclaimer />

        <CustomMarkdown>{answer}</CustomMarkdown>
      </YStack>
    </MyScroll>
  );
};

export default AIGeneratedAnswer;
