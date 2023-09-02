import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ListFilter } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { Button, Text, YStack } from "tamagui";

import { questionsSortingOptions, sortingOrders } from "../../assets/data";
import { MyStack } from "../../components/MyStack";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";
import SearchFilterSheet from "../../components/SearchFilterSheet";
import Sort from "../../components/Sort";
import TabHeading from "../../components/TabHeading";

const Search = () => {
  const [searchQuestion, setSearchQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sort, setSort] = useState(questionsSortingOptions[0]);
  const [sortingOrder, setSortingOrder] = useState(sortingOrders[0]);

  const [searchFilterIsOpen, setSearchFilterIsOpen] = useState(false);
  const [searchFilterIsApplied, setSearchFilterIsApplied] = useState(false);
  const [isAcceptedAnswer, setIsAcceptedAnswer] = useState(false);
  const [minAnswers, setMinAnswers] = useState([10]);
  const [minViews, setMinViews] = useState([10]);

  const openSearchFilter = () => {
    setSearchFilterIsOpen(true);
  };

  const applySearchFilter = () => {
    setSearchFilterIsApplied(true);
    setSearchFilterIsOpen(false);

    if (questions?.length === 0) return;

    getQuestions();
  };

  const clearSearchFilter = () => {
    setSearchFilterIsApplied(false);
    setSearchFilterIsOpen(false);

    if (questions?.length === 0) return;

    getQuestions();
  };

  const getQuestions = async () => {
    if (!searchQuestion) return;

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
            key: process.env.EXPO_PUBLIC_API_KEY,

            ...(searchFilterIsApplied && {
              accepted: isAcceptedAnswer,
              answers: minAnswers[0],
              views: minViews[0]
            })
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

  useEffect(() => {
    if (questions?.length === 0) return;

    getQuestions();
  }, [sort, sortingOrder]);

  return (
    <>
      <MyStack>
        <TabHeading>ask question</TabHeading>

        <SearchBar
          setSearchQuestion={setSearchQuestion}
          searchQuestion={searchQuestion}
          onPress={getQuestions}
          onClear={clearSearch}
        />

        {searchQuestion && (
          <YStack
            marginBottom={15}
            marginTop={5}
          >
            <Sort
              sort={sort}
              setSort={setSort}
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
              data={questionsSortingOptions}
            />

            <Button
              theme="green"
              icon={ListFilter}
              onPress={openSearchFilter}
              alignSelf="flex-start"
              marginLeft={5}
              marginTop={5}
            >
              Advance Search Filters
            </Button>

            {searchFilterIsApplied && (
              <Text
                marginLeft={5}
                marginTop={15}
              >
                Search Filters Applied
              </Text>
            )}
          </YStack>
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

      {searchFilterIsOpen && (
        <SearchFilterSheet
          open={searchFilterIsOpen}
          setOpen={setSearchFilterIsOpen}
          onApply={applySearchFilter}
          onClear={clearSearchFilter}
          isAcceptedAnswer={isAcceptedAnswer}
          setIsAcceptedAnswer={setIsAcceptedAnswer}
          minAnswers={minAnswers}
          setMinAnswers={setMinAnswers}
          minViews={minViews}
          setMinViews={setMinViews}
        />
      )}
    </>
  );
};

export default Search;
