import React, { useEffect, useState } from "react";
import { View } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

const Question = () => {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState({});

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/questions",
        {
          params: {
            ids: id,
            order: "desc",
            sort: "activity",
            site: "stackoverflow",
            filter: "!*Mg4Pjffu(Nk2BMY"
          }
        }
      );
      console.log(response.data.items[0]);

      setQuestion(response.data.items[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <View
      style={{
        flex: 1
      }}
    ></View>
  );
};

export default Question;
