import { useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Error from "../../components/Error";
import { MyStack } from "../../components/MyStack";
import QuestionCard, { IQuestion } from "../../components/QuestionCard";
import Sort from "../../components/Sort";
import {
  FEATURED_QUESTIONS_SORTING_OPTIONS,
  SORTING_ORDERS
} from "../../constants/sorting";

const Home = () => {
  const [sort, setSort] = useState<string>(
    FEATURED_QUESTIONS_SORTING_OPTIONS[0]
  );
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const getFeaturedQuestions = async () => {
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/questions/featured?",
        {
          params: {
            order: sortingOrder,
            sort: sort,
            site: "stackoverflow",
            filter: "!nNPvSNP4(R",
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      return response.data.items;
    } catch (error) {
      return error;
    }
  };

  const {
    isPending,
    error,
    refetch,
    data: questions
  } = useQuery({
    queryKey: ["questionsData", sort, sortingOrder],
    queryFn: getFeaturedQuestions
  });

  if (error) return <Error />;

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
        data={questions as IQuestion[]}
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
            refreshing={isPending}
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
