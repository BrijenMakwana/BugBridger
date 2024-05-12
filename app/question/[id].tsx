import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { H6, Spinner, Tabs, XStack } from "tamagui";

import AIGeneratedAnswer from "@/components/AIGeneratedAnswer";
import Answers from "@/components/Answers";
import CommentsButton from "@/components/CommentsButton";
import CustomMarkdown from "@/components/CustomMarkdown";
import Error from "@/components/Error";
import GoBack from "@/components/GoBack";
import { MyScroll } from "@/components/MyScroll";
import PostNotice from "@/components/PostNotice";
import QuestionCard from "@/components/QuestionCard";
import RelatedQuestion from "@/components/RelatedQuestion";
import ShareButtonGroup from "@/components/ShareButtonGroup";
import useQuestion from "@/hooks/useQuestion";
import useRelatedQuestions from "@/hooks/useRelatedQuestions";
import { isTablet } from "@/utils/utils";

const Question = () => {
  const { id } = useLocalSearchParams();

  const { question, isFetching, isError, refetch } = useQuestion(id);

  const { relatedQuestions } = useRelatedQuestions(id);

  if (isFetching)
    return (
      <Spinner
        size="large"
        color="$green10"
      />
    );

  if (isError) return <Error refetch={refetch} />;

  return (
    <>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        marginTop={5}
        paddingHorizontal={10}
      >
        <GoBack />

        <ShareButtonGroup link={question?.link} />
      </XStack>

      <Tabs
        defaultValue="tab1"
        flex={1}
        flexDirection="column"
        marginTop={20}
        paddingHorizontal={10}
      >
        <Tabs.List
          theme="green"
          marginBottom={10}
          alignSelf="center"
          width={isTablet ? "60%" : "100%"}
        >
          <Tabs.Tab value="tab1">
            <H6>Question</H6>
          </Tabs.Tab>

          <Tabs.Tab
            value="tab2"
            flex={1}
          >
            <H6>
              {question?.answer_count === 0
                ? "AI Answer"
                : `Answers(${question?.answer_count})`}
            </H6>
          </Tabs.Tab>

          <Tabs.Tab value="tab3">
            <H6>Related</H6>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content
          value="tab1"
          flex={1}
        >
          <MyScroll>
            {question?.notice && <PostNotice {...question?.notice} />}

            <QuestionCard {...question} />

            <CommentsButton comments={question?.comments} />

            <CustomMarkdown>{question?.body_markdown}</CustomMarkdown>
          </MyScroll>
        </Tabs.Content>

        <Tabs.Content
          value="tab2"
          flex={1}
        >
          {question?.answer_count === 0 ? (
            <AIGeneratedAnswer questionMarkdown={question?.body_markdown} />
          ) : (
            <Answers answers={question?.answers} />
          )}
        </Tabs.Content>

        <Tabs.Content
          value="tab3"
          flex={1}
        >
          <FlashList
            data={relatedQuestions}
            renderItem={({ item }) => <RelatedQuestion {...item} />}
            estimatedItemSize={20}
          />
        </Tabs.Content>
      </Tabs>
    </>
  );
};

export default Question;
