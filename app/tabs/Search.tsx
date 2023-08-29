import { useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";

import { MyStack } from "../../components/MyStack";
import QuestionCard from "../../components/QuestionCard";
import SearchBar from "../../components/SearchBar";

const Search = () => {
  const [searchQuestion, setSearchQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getQuestions = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/search/advanced",
        {
          params: {
            q: searchQuestion,
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
            onRefresh={getQuestions}
          />
        }
      />
    </MyStack>
  );
};

export default Search;
