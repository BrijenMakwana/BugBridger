import { useState } from "react";
import { FlashList } from "@shopify/flash-list";

import Error from "@/components/Error";
import { MyStack } from "@/components/MyStack";
import QuestionCard from "@/components/QuestionCard";
import Sort from "@/components/Sort";
import {
  FEATURED_QUESTIONS_SORTING_OPTIONS,
  SORTING_ORDERS
} from "@/constants";
import useFeaturedQuestions from "@/hooks/useFeaturedQuestions";
import { Spinner } from "tamagui";

const Home = () => {
  const [sort, setSort] = useState<string>(
    FEATURED_QUESTIONS_SORTING_OPTIONS[0]
  );
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const {
    data: questions,
    isPending,
    refetch,
    error
  } = useFeaturedQuestions(sortingOrder, sort);

  if (error)
    return (
      <Error
        refetch={refetch}
        error={error}
      />
    );

  return (
    <MyStack>
      {questions?.length > 0 && (
        <Sort
          sort={sort}
          setSort={setSort}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
          data={FEATURED_QUESTIONS_SORTING_OPTIONS}
        />
      )}

      {isPending && (
        <Spinner
          size="large"
          color="$green10Dark"
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
        estimatedItemSize={150}
        contentContainerStyle={{
          paddingHorizontal: 10
        }}
      />
    </MyStack>
  );
};

export default Home;
