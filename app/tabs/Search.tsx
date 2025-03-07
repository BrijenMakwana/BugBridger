import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { ListFilter } from "@tamagui/lucide-icons";
import { Button, Text, YStack, Spinner } from "tamagui";
import Error from "@/components/Error";
import { MyStack } from "@/components/MyStack";
import QuestionCard from "@/components/QuestionCard";
import SearchBar from "@/components/SearchBar";
import SearchFilterSheet from "@/components/SearchFilterSheet";
import Sort from "@/components/Sort";
import { QUESTIONS_SORTING_OPTIONS } from "@/constants";
import useSearch from "@/hooks/useSearch";

const Search = () => {
  const [searchFilterIsOpen, setSearchFilterIsOpen] = useState(false);

  const {
    isFetching,
    isError,
    error,
    refetch,
    data: questions,
    searchQuestion,
    setSearchQuestion,
    sort,
    setSort,
    sortingOrder,
    setSortingOrder,
    searchFilterIsApplied,
    setSearchFilterIsApplied,
    isAcceptedAnswer,
    setIsAcceptedAnswer,
    minAnswers,
    setMinAnswers,
    minViews,
    setMinViews
  } = useSearch();

  const applySearchFilter = () => {
    setSearchFilterIsApplied(true);
    setSearchFilterIsOpen(false);
  };

  const clearSearchFilter = () => {
    setSearchFilterIsApplied(false);
    setSearchFilterIsOpen(false);
  };

  const clearSearch = () => {
    setSearchQuestion("");
    clearSearchFilter();
  };

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
              onPress={() => setSearchFilterIsOpen(true)}
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

        {isFetching && (
          <Spinner
            size="large"
            color="$green10Dark"
          />
        )}

        {!isFetching && isError && (
          <Error
            error={error}
            refetch={refetch}
          />
        )}

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
