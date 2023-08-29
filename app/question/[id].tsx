import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { ChevronDown, Verified } from "@tamagui/lucide-icons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import {
  Accordion,
  H5,
  Paragraph,
  Square,
  Tabs,
  Text,
  XStack,
  YStack
} from "tamagui";

import CustomMarkdown from "../../components/CustomMarkdown";
import ExternalButton from "../../components/ExternalButton";
import GoBack from "../../components/GoBack";
import { MyScroll } from "../../components/MyScroll";
import PostCreationInfo from "../../components/PostCreationInfo";
import QuestionCard from "../../components/QuestionCard";
import RelatedQuestion from "../../components/RelatedQuestion";

const Answers = (props) => {
  const { answers } = props;

  return (
    <YStack
      paddingHorizontal={15}
      animation="quick"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
    >
      <Accordion
        overflow="hidden"
        type="multiple"
        marginTop={20}
      >
        {answers?.map((item, index) => (
          <Answer
            index={index}
            key={item.answer_id}
            {...item}
          />
        ))}
      </Accordion>
    </YStack>
  );
};

const Answer = (props) => {
  const { index, body_markdown, is_accepted, owner, creation_date, link } =
    props;
  return (
    <Accordion.Item value={`answer${index}`}>
      <Accordion.Trigger
        flexDirection="row"
        justifyContent="space-between"
      >
        {({ open }) => (
          <>
            <XStack alignItems="center">
              <Paragraph marginRight={15}>Answer {index + 1}</Paragraph>
              {is_accepted && (
                <>
                  <Verified color="$green10Dark" />
                  <Text
                    fontSize="$4"
                    fontWeight="bold"
                    color="$green10Dark"
                    marginLeft={5}
                  >
                    Accepted
                  </Text>
                </>
              )}
            </XStack>

            <Square
              animation="quick"
              rotate={open ? "180deg" : "0deg"}
            >
              <ChevronDown size="$1" />
            </Square>
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

const Question = () => {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);

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
            order: "desc",
            sort: "activity",
            site: "stackoverflow",
            filter: "!6WPIomp-ebb*M",
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
            <H5>Answers({question?.answer_count})</H5>
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
          <MyScroll>
            <Answers
              answers={answers}
              answerCount={question?.answer_count}
            />
          </MyScroll>
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
