import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import { ArrowLeft } from "@tamagui/lucide-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { decode } from "html-entities";
import { Button, YStack } from "tamagui";

import { MyScroll } from "../../components/MyScroll";
import QuestionCard from "../../components/QuestionCard";

const Question = () => {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState({});

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/questions/${id}?`,
        {
          params: {
            order: "desc",
            sort: "activity",
            site: "stackoverflow",
            filter: "!nNPvSNP4(R"
          }
        }
      );

      setQuestion(response.data.items[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <MyScroll>
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
      <QuestionCard {...question} />

      <Markdown style={styles}>{decode(question.body_markdown)}</Markdown>
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
