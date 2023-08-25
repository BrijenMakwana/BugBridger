import { useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import { Redirect, useRouter } from "expo-router";

import { MyStack } from "../components/MyStack";
import QuestionCard from "../components/QuestionCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [searchQuestion, setSearchQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getQuestions = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&q=${searchQuestion}&site=stackoverflow&filter=!nNPvSNPI7A`
      );

      setQuestions(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuestion("");
    setQuestions([]);
  };

  return (
    <MyStack>
      <SearchBar
        setSearchQuestion={setSearchQuestion}
        searchQuestion={searchQuestion}
        onPress={getQuestions}
        onClear={clearSearch}
      />

      <FlashList
        data={questions}
        renderItem={({ item }) => (
          <QuestionCard
            question={item.title}
            questionBody={item.body}
            tags={item.tags}
            voteCount={item.score}
            answerCount={item.answer_count}
            viewCount={item.view_count}
            username={item.owner.display_name}
            userAvatar={item.owner.profile_image}
            creationDate={item.creation_date}
          />
        )}
        estimatedItemSize={200}
        refreshControl={
          <RefreshControl
            refreshing={isSearching}
            colors={["green"]}
            progressBackgroundColor="#333333"
            onRefresh={getQuestions}
          />
        }
      />
    </MyStack>
  );
}