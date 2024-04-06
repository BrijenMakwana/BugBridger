import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { H6, Spinner, Tabs, XStack, YStack } from "tamagui";

import AIGeneratedAnswer from "../../components/AIGeneratedAnswer";
import Answers from "../../components/Answers";
import CommentsButton from "../../components/CommentsButton";
import CustomMarkdown from "../../components/CustomMarkdown";
import Error from "../../components/Error";
import GoBack from "../../components/GoBack";
import { MyScroll } from "../../components/MyScroll";
import QuestionCard, { IQuestion } from "../../components/QuestionCard";
import RelatedQuestion, {
  IRelatedQuestion
} from "../../components/RelatedQuestion";
import ShareButtonGroup from "../../components/ShareButtonGroup";
import Sort from "../../components/Sort";
import {
  ANSWERS_SORTING_OPTIONS,
  SORTING_ORDERS
} from "../../constants/sorting";
import { isTablet } from "../../utils/utils";

const Question = () => {
  const { id } = useLocalSearchParams();

  const [answerSort, setAnswerSort] = useState<string>(
    ANSWERS_SORTING_OPTIONS[0]
  );
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const getQuestion = async () => {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/questions/${id}?`,
      {
        params: {
          order: "desc",
          sort: "activity",
          site: "stackoverflow",
          filter: "!u.*0Ven9AaxQs(87(eFpgI(sjhuUNV-",
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      }
    );

    return response.data.items[0];
  };

  const getRelatedQuestions = async () => {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/questions/${id}/related?`,
      {
        params: {
          order: "desc",
          sort: "activity",
          site: "stackoverflow",
          filter: "!szz-rpK9Axv5zb.Gmodt6fEhGVd-MSW",
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      }
    );

    return response.data.items;
  };

  const {
    data: question,
    isFetching,
    error
  }: {
    data: IQuestion;
    isFetching: boolean;
    error: Error;
  } = useQuery({
    queryKey: ["questionData"],
    queryFn: getQuestion
  });

  const {
    data: relatedQuestions
  }: {
    data: IRelatedQuestion[];
  } = useQuery({
    queryKey: ["relatedQuestionsData"],
    queryFn: getRelatedQuestions
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
            <QuestionCard {...question} />

            <YStack>
              <CommentsButton comments={question?.comments} />

              <CustomMarkdown>{question?.body_markdown}</CustomMarkdown>
            </YStack>
          </MyScroll>
        </Tabs.Content>

        <Tabs.Content
          value="tab2"
          flex={1}
        >
          {question?.answers?.length > 1 && (
            <Sort
              sort={answerSort}
              setSort={setAnswerSort}
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
              data={ANSWERS_SORTING_OPTIONS}
            />
          )}

          {question?.answers?.length === 0 ? (
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
