import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import { ArrowLeft, ChevronDown, Verified } from "@tamagui/lucide-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { decode } from "html-entities";
import {
  Accordion,
  Button,
  H3,
  Paragraph,
  Square,
  Text,
  XStack,
  YStack
} from "tamagui";

import { MyScroll } from "../../components/MyScroll";
import QuestionCard from "../../components/QuestionCard";

const GoBack = () => {
  const goBack = () => {
    router.back();
  };

  return (
    <Button
      icon={ArrowLeft}
      size="$4"
      backgroundColor="$green10Dark"
      animation="bouncy"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
      marginBottom={10}
      marginHorizontal={5}
      onPress={goBack}
    >
      Go Back
    </Button>
  );
};

const Answers = (props) => {
  const { answers } = props;
  return (
    <Accordion
      overflow="hidden"
      type="multiple"
      marginTop={20}
    >
      {answers?.map((item, index) => (
        <Answer
          index={index}
          key={item.answer_id}
          isAccepted={item.is_accepted}
        >
          <Markdown style={styles}>{decode(item.body_markdown)}</Markdown>
        </Answer>
      ))}
    </Accordion>
  );
};

const Answer = (props) => {
  const { index, children, isAccepted } = props;
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
              {isAccepted && (
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
      <Accordion.Content unstyled>{children}</Accordion.Content>
    </Accordion.Item>
  );
};

const Question = () => {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

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
            filter: "!nNPvSNe7Gv",
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setAnswers(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getQuestion();
    getAnswers();
  }, []);
  return (
    <MyScroll>
      <GoBack />

      <QuestionCard {...question} />

      <Markdown style={styles}>{decode(question.body_markdown)}</Markdown>

      <YStack
        marginTop={10}
        padding={15}
      >
        <H3 color="$green10Dark">Answers</H3>
        <Answers answers={answers} />
      </YStack>
    </MyScroll>
  );
};

export default Question;

const styles = StyleSheet.create({
  body: {
    padding: 15
  },
  text: {
    color: "#fff",
    fontSize: 16
  }
});
