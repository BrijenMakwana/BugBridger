import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { H5, Spinner, Tabs, XStack, YStack } from "tamagui";

import AnswersTab from "../../components/AnswersTab";
import CustomMarkdown from "../../components/CustomMarkdown";
import GoBack from "../../components/GoBack";
import { MyScroll } from "../../components/MyScroll";
import QuestionCard from "../../components/QuestionCard";
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
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/questions/${id}?`,
        {
          params: {
            order: "desc",
            sort: "activity",
            site: "stackoverflow",
            filter: "!nNPvSNP4(R",
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      return response.data.items[0];
    } catch (error) {
      return error;
    }
  };

  const getAnswers = async () => {
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/questions/${id}/answers?`,
        {
          params: {
            order: sortingOrder,
            sort: answerSort,
            site: "stackoverflow",
            filter: "!3vIo5M6G45qJ8_tw-",
            pageSize: 100,
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      return response.data.items;
    } catch (error) {
      return error;
    }
  };

  const getRelatedQuestions = async () => {
    try {
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
    } catch (error) {
      return error;
    }
  };

  const { data: question, isPending } = useQuery({
    queryKey: ["questionData"],
    queryFn: getQuestion
  });

  const { data: answers } = useQuery({
    queryKey: ["answersData", answerSort, sortingOrder],
    queryFn: getAnswers
  });

  const { data: relatedQuestions } = useQuery({
    queryKey: ["relatedQuestionsData"],
    queryFn: getRelatedQuestions
  });

  if (isPending)
    return (
      <Spinner
        size="large"
        color="$green10"
      />
    );

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
            <H5>Question</H5>
          </Tabs.Tab>

          <Tabs.Tab
            value="tab2"
            flex={1}
          >
            <H5>Answers({question?.answer_count || 0})</H5>
          </Tabs.Tab>

          <Tabs.Tab value="tab3">
            <H5>Related</H5>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content
          value="tab1"
          flex={1}
        >
          <MyScroll>
            <QuestionCard
              type="question"
              {...question}
            />

            <YStack>
              <CustomMarkdown>{question?.body_markdown}</CustomMarkdown>
            </YStack>
          </MyScroll>
        </Tabs.Content>

        <Tabs.Content
          value="tab2"
          flex={1}
        >
          {answers?.length > 1 && (
            <Sort
              sort={answerSort}
              setSort={setAnswerSort}
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
              data={ANSWERS_SORTING_OPTIONS}
            />
          )}

          <AnswersTab answers={answers} />
        </Tabs.Content>

        <Tabs.Content
          value="tab3"
          flex={1}
        >
          <FlashList
            data={relatedQuestions as IRelatedQuestion[]}
            renderItem={({ item }) => <RelatedQuestion {...item} />}
            estimatedItemSize={20}
          />
        </Tabs.Content>
      </Tabs>
    </>
  );
};

export default Question;
