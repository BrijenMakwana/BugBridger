import { useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";

import Error from "@/components/Error";
import { MyStack } from "@/components/MyStack";
import QuestionCard from "@/components/QuestionCard";
import Sort from "@/components/Sort";
import {
  FEATURED_QUESTIONS_SORTING_OPTIONS,
  SORTING_ORDERS
} from "@/constants";
import useFeaturedQuestions from "@/hooks/useFeaturedQuestions";

const Home = () => {
  const [sort, setSort] = useState<string>(
    FEATURED_QUESTIONS_SORTING_OPTIONS[0]
  );
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const { questions, isFetching, isError, refetch } = useFeaturedQuestions(
    sortingOrder,
    sort
  );

  if (isError) return <Error refetch={refetch} />;

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

      <FlashList
        data={questions}
        renderItem={({ item }) => (
          <QuestionCard
            {...item}
            isBody
          />
        )}
        estimatedItemSize={5}
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
    </MyStack>
  );
};

export default Home;
