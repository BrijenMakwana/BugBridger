import { FlashList } from "@shopify/flash-list";
import { ChevronDown } from "@tamagui/lucide-icons";
import { Accordion, Paragraph, Square, XStack, YStack } from "tamagui";

import CommentsButton from "./CommentsButton";
import CustomMarkdown from "./CustomMarkdown";
import PostCreationInfo from "./PostCreationInfo";
import VoteCount from "./VoteCount";

import { IAnswer } from "@/types";

interface IAnswers {
  answers: IAnswer[];
}

const Answer = (props: IAnswer) => {
  const {
    index,
    body_markdown,
    is_accepted,
    owner,
    creation_date,
    up_vote_count,
    comments
  } = props;

  return (
    <Accordion.Item value={`answer${index}`}>
      <Accordion.Trigger
        flexDirection="row"
        justifyContent="space-between"
      >
        {({ open }) => (
          <>
            <Paragraph marginRight={15}>Answer {index + 1}</Paragraph>

            <XStack alignItems="center">
              <VoteCount
                isAccepted={is_accepted}
                vote={up_vote_count}
              />

              <Square
                animation="quick"
                rotate={open ? "180deg" : "0deg"}
                marginLeft={20}
              >
                <ChevronDown size="$1" />
              </Square>
            </XStack>
          </>
        )}
      </Accordion.Trigger>

      <Accordion.Content unstyled>
        <YStack
          paddingVertical={10}
          gap={10}
          marginBottom={10}
        >
          <CustomMarkdown>{body_markdown}</CustomMarkdown>

          <PostCreationInfo
            creationDate={creation_date}
            {...owner}
          />

          <CommentsButton comments={comments} />
        </YStack>
      </Accordion.Content>
    </Accordion.Item>
  );
};

const Answers = (props: IAnswers) => {
  const { answers } = props;

  return (
    <Accordion
      overflow="hidden"
      type="multiple"
      marginTop={15}
      paddingHorizontal={5}
      animation="quick"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
      flex={1}
    >
      <FlashList
        data={answers}
        renderItem={({ item, index }) => (
          <Answer
            index={index}
            {...item}
          />
        )}
        estimatedItemSize={20}
        showsVerticalScrollIndicator={false}
      />
    </Accordion>
  );
};

export default Answers;
