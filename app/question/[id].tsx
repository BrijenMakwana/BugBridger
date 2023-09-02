import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { H5, Tabs, YStack } from "tamagui";

import { answersSortingOptions, sortingOrders } from "../../assets/data";
import AnswersTab from "../../components/AnswersTab";
import CustomMarkdown from "../../components/CustomMarkdown";
import GoBack from "../../components/GoBack";
import { MyScroll } from "../../components/MyScroll";
import Post from "../../components/Post";
import RelatedQuestion from "../../components/RelatedQuestion";
import Sort from "../../components/Sort";

const Question = () => {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);

  const [answerSort, setAnswerSort] = useState(answersSortingOptions[0]);
  const [sortingOrder, setSortingOrder] = useState(sortingOrders[0]);

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
      console.log(id);
      setQuestion(response.data.items[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
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

      setAnswers(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
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

      setRelatedQuestions(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getQuestion();
    getAnswers();
    getRelatedQuestions();
  }, []);

  useEffect(() => {
    getAnswers();
  }, [answerSort, sortingOrder]);

  return (
    <>
      <GoBack />

      <Tabs
        defaultValue="tab1"
        flex={1}
        flexDirection="column"
        marginTop={20}
      >
        <Tabs.List
          theme="green"
          marginBottom={10}
          marginHorizontal={5}
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
            <Post
              type="question"
              {...question}
              isExternal
            />

            <YStack paddingHorizontal={15}>
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
              data={answersSortingOptions}
            />
          )}

          <AnswersTab answers={answers} />
        </Tabs.Content>

        <Tabs.Content
          value="tab3"
          flex={1}
        >
          <FlashList
            data={relatedQuestions}
            renderItem={({ item }) => <RelatedQuestion {...item} />}
            estimatedItemSize={50}
          />
        </Tabs.Content>
      </Tabs>
    </>
  );
};

export default Question;
