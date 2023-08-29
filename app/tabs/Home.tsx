import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import { H2 } from "tamagui";

import { MyStack } from "../../components/MyStack";
import QuestionCard from "../../components/QuestionCard";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getFeaturedQuestions = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/questions/featured?",
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

      setQuestions(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getFeaturedQuestions();
  }, []);
  return (
    <MyStack>
      <H2
        color="$green10Dark"
        textTransform="capitalize"
        marginVertical={10}
        marginLeft={5}
      >
        Featured Questions
      </H2>

      <FlashList
        data={questions}
        renderItem={({ item }) => (
          <QuestionCard
            {...item}
            isBody
          />
        )}
        estimatedItemSize={50}
        refreshControl={
          <RefreshControl
            refreshing={isSearching}
            colors={["green"]}
            progressBackgroundColor="#333333"
            onRefresh={getFeaturedQuestions}
          />
        }
      />
    </MyStack>
  );
};

export default Home;
