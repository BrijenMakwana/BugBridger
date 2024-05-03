import { Spinner, YStack } from "tamagui";

import useAI from "../hooks/useAI";

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

  const prompt = `You are an experienced developer tasked with generating an answer in markdown format based on a given question. Here is the prompt: '${questionMarkdown}'. Please proceed to generate the answer in markdown.`;

  const { data: answer, isFetching, isError, refetch } = useAI(prompt);

  if (isFetching)
    return (
      <Spinner
        size="large"
        color="$green10"
      />
    );

  if (isError) return <Error refetch={refetch} />;

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
