import { FlashList } from "@shopify/flash-list";
import { ChevronDown, TrendingUp } from "@tamagui/lucide-icons";
import { Accordion, Paragraph, Square, Text, XStack, YStack } from "tamagui";

import CustomMarkdown from "./CustomMarkdown";
import ExternalButton from "./ExternalButton";
import PostCreationInfo from "./PostCreationInfo";
import VoteCount from "./VoteCount";

const Answer = (props) => {
  const {
    index,
    body_markdown,
    is_accepted,
    owner,
    creation_date,
    link,
    up_vote_count
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
          padding={10}
          gap={10}
          marginBottom={10}
        >
          <CustomMarkdown>{body_markdown}</CustomMarkdown>

          <PostCreationInfo
            type="answer"
            creationDate={creation_date}
            {...owner}
          />

          <ExternalButton link={link} />
        </YStack>
      </Accordion.Content>
    </Accordion.Item>
  );
};

const AnswersTab = (props) => {
  const { answers } = props;

  return (
    <Accordion
      overflow="hidden"
      type="multiple"
      marginTop={15}
      paddingHorizontal={10}
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
        estimatedItemSize={30}
        showsVerticalScrollIndicator={false}
      />
    </Accordion>
  );
};

export default AnswersTab;
