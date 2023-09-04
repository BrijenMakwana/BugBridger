import { useEffect, useState } from "react";
import { RefreshControl, ToastAndroid } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { XStack } from "tamagui";

import { MyStack } from "../../components/MyStack";
import Post from "../../components/Post";
import SiteInfoButton from "../../components/SiteInfoButton";
import Sort from "../../components/Sort";
import TabHeading from "../../components/TabHeading";
import {
  FEATURED_QUESTIONS_SORTING_OPTIONS,
  SORTING_ORDERS
} from "../../constants/sorting";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [sort, setSort] = useState<string>(
    FEATURED_QUESTIONS_SORTING_OPTIONS[0]
  );
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const getFeaturedQuestions = async () => {
    setIsSearching(true);

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

      setQuestions(response.data.items);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getFeaturedQuestions();
  }, [sort, sortingOrder]);

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
            onRefresh={getFeaturedQuestions}
          />
        }
      />
    </MyStack>
  );
};

export default Home;
