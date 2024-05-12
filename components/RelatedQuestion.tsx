import { Link } from "expo-router";
import { decode } from "html-entities";
import { H6, XStack } from "tamagui";

import VoteCount from "./VoteCount";

import { IQuestion } from "@/types";

const RelatedQuestion = (props: IQuestion) => {
  const { question_id, up_vote_count, title, is_answered } = props;

  return (
    <Link
      href={`/question/${question_id}`}
      asChild
    >
      <XStack
        marginVertical={10}
        gap={20}
        alignItems="flex-start"
        justifyContent="space-between"
        animation="quick"
        pressStyle={{ scale: 0.95, backgroundColor: "$backgroundHover" }}
        enterStyle={{
          scale: 0.5,
          opacity: 0
        }}
      >
        <VoteCount
          isAccepted={is_answered}
          vote={up_vote_count}
        />

        <H6 flex={1}>{decode(title)}</H6>
      </XStack>
    </Link>
  );
};

export default RelatedQuestion;
