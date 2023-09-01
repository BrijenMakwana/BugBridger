import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { XStack } from "tamagui";

import { questionsSortingOptions, sortingOrders } from "../../assets/data";
import { MyStack } from "../../components/MyStack";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";
import SortingOptions from "../../components/SortingOptions";

const Search = () => {
  const [searchQuestion, setSearchQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sort, setSort] = useState(questionsSortingOptions[0]);
  const [sortingOrder, setSortingOrder] = useState(sortingOrders[0]);

  const getQuestions = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/search/advanced",
        {
          params: {
            q: searchQuestion,
            order: sortingOrder,
            sort: sort,
            site: "stackoverflow",
            filter: "!nNPvSNP4(R",
            pageSize: 100,
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setQuestions(response.data.items);
      console.log(response.data.items.length);
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

  useEffect(() => {
    if (!searchQuestion) return;

    getQuestions();
  }, [sort, sortingOrder]);

  return (
    <MyStack>
      <SearchBar
        setSearchQuestion={setSearchQuestion}
        searchQuestion={searchQuestion}
        onPress={getQuestions}
        onClear={clearSearch}
      />

      {searchQuestion && (
        <XStack
          gap={20}
          alignItems="center"
          justifyContent="space-between"
          marginVertical={15}
          marginHorizontal={5}
          animation="quick"
          enterStyle={{
            scale: 0.5,
            opacity: 0
          }}
        >
          <SortingOptions
            sort={sort}
            setSort={setSort}
            data={questionsSortingOptions}
            title="Sort"
          />
          <SortingOptions
            sort={sortingOrder}
            setSort={setSortingOrder}
            data={sortingOrders}
            title="Order"
          />
        </XStack>
      )}

      <FlashList
        data={questions}
        renderItem={({ item }) => (
          <Post
            type="question"
            {...item}
            isBody
          />
        )}
        estimatedItemSize={50}
        refreshControl={
          <RefreshControl
            refreshing={isSearching}
            colors={[darkColors.green11]}
            progressBackgroundColor={darkColors.gray5}
            onRefresh={getQuestions}
          />
        }
      />
    </MyStack>
  );
};

export default Search;
