import { useEffect, useState } from "react";
import { RefreshControl, ToastAndroid } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ListFilter } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { Button, Text, YStack } from "tamagui";

import { MyStack } from "../../components/MyStack";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";
import SearchFilterSheet from "../../components/SearchFilterSheet";
import Sort from "../../components/Sort";
import TabHeading from "../../components/TabHeading";
import {
  QUESTIONS_SORTING_OPTIONS,
  SORTING_ORDERS
} from "../../constants/sorting";

const Search = () => {
  const [searchQuestion, setSearchQuestion] = useState<string>("");
  const [questions, setQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [sort, setSort] = useState<string>(QUESTIONS_SORTING_OPTIONS[0]);
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const [searchFilterIsOpen, setSearchFilterIsOpen] = useState<boolean>(false);
  const [searchFilterIsApplied, setSearchFilterIsApplied] =
    useState<boolean>(false);
  const [isAcceptedAnswer, setIsAcceptedAnswer] = useState<boolean>(false);
  const [minAnswers, setMinAnswers] = useState<number[]>([10]);
  const [minViews, setMinViews] = useState<number[]>([10]);

  const questionsAreEmpty = () => {
    return questions?.length === 0;
  };

  const openSearchFilter = () => {
    setSearchFilterIsOpen(true);
  };

  const closeSearchFilter = () => {
    setSearchFilterIsOpen(false);
  };

  const applySearchFilter = () => {
    setSearchFilterIsApplied(true);
    closeSearchFilter();

    if (questionsAreEmpty()) return;

    getQuestions();
  };

  const clearSearchFilter = () => {
    setSearchFilterIsApplied(false);
    closeSearchFilter();

    if (questionsAreEmpty()) return;

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
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuestion("");
    setQuestions([]);
  };

  useEffect(() => {
    if (questionsAreEmpty()) return;

    getQuestions();
  }, [sort, sortingOrder]);

  return (
    <>
      <MyStack>
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
              data={QUESTIONS_SORTING_OPTIONS}
            />

            <Button
              theme="green"
              icon={ListFilter}
              onPress={openSearchFilter}
              size="$3"
              alignSelf="flex-start"
              marginLeft={5}
              marginTop={5}
              animation="quick"
              enterStyle={{
                scale: 0.5,
                opacity: 0
              }}
            >
              Advance Search Filters
            </Button>

            {searchFilterIsApplied && (
              <Text
                marginLeft={5}
                marginTop={15}
                animation="quick"
                enterStyle={{
                  scale: 0.5,
                  opacity: 0
                }}
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
