import { useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ListFilter } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Text, YStack } from "tamagui";

import Error from "../../components/Error";
import { MyStack } from "../../components/MyStack";
import QuestionCard, { IQuestion } from "../../components/QuestionCard";
import SearchBar from "../../components/SearchBar";
import SearchFilterSheet from "../../components/SearchFilterSheet";
import Sort from "../../components/Sort";
import {
  QUESTIONS_SORTING_OPTIONS,
  SORTING_ORDERS
} from "../../constants/sorting";

const Search = () => {
  const [searchQuestion, setSearchQuestion] = useState("");
  const [sort, setSort] = useState<string>(QUESTIONS_SORTING_OPTIONS[0]);
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const [searchFilterIsOpen, setSearchFilterIsOpen] = useState(false);
  const [searchFilterIsApplied, setSearchFilterIsApplied] = useState(false);
  const [isAcceptedAnswer, setIsAcceptedAnswer] = useState(false);
  const [minAnswers, setMinAnswers] = useState<number[]>([10]);
  const [minViews, setMinViews] = useState<number[]>([10]);

  const openSearchFilter = () => {
    setSearchFilterIsOpen(true);
  };

  const closeSearchFilter = () => {
    setSearchFilterIsOpen(false);
  };

  const applySearchFilter = () => {
    setSearchFilterIsApplied(true);
    closeSearchFilter();
  };

  const clearSearchFilter = () => {
    setSearchFilterIsApplied(false);
    closeSearchFilter();
  };

  const clearSearch = () => {
    setSearchQuestion("");
    clearSearchFilter();
  };

  const searchQuestions = async () => {
    if (!searchQuestion) return [];

    const response = await axios.get(
      "https://api.stackexchange.com/2.3/search/advanced",
      {
        params: {
          q: searchQuestion,
          order: sortingOrder,
          sort: sort,
          site: "stackoverflow",
          filter: "!7vXVX*mzcfem2OT0*5LAwQdhdFSw1HC7_f",
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

    return response.data.items;
  };

  const {
    isFetching,
    isError,
    refetch,
    data: questions
  }: {
    isFetching: boolean;
    isError: boolean;
    refetch: () => void;
    data: IQuestion[];
  } = useQuery({
    queryKey: [
      "searchQuestionsData",
      sort,
      sortingOrder,
      searchFilterIsApplied
    ],
    queryFn: searchQuestions
  });

  return (
    <>
      <MyStack>
        <SearchBar
          setSearchQuestion={setSearchQuestion}
          searchQuestion={searchQuestion}
          onPress={refetch}
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
              Advanced Search Filters
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

        {!isFetching && isError && <Error refetch={refetch} />}

        {searchQuestion && (
          <FlashList
            data={questions}
            renderItem={({ item }) => (
              <QuestionCard
                {...item}
                isBody
              />
            )}
            keyExtractor={(item) => item.question_id.toString()}
            estimatedItemSize={200}
            contentContainerStyle={{
              paddingHorizontal: 10
            }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                colors={[darkColors.green11]}
                progressBackgroundColor={darkColors.gray5}
                onRefresh={refetch}
              />
            }
          />
        )}
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
