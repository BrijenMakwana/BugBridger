import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { H2, XStack } from "tamagui";

import {
  featuredQuestionsSortingOptions,
  sortingOrders
} from "../../assets/data";
import { MyStack } from "../../components/MyStack";
import Post from "../../components/Post";
import SiteInfoButton from "../../components/SiteInfoButton";
import Sort from "../../components/Sort";
import TabHeading from "../../components/TabHeading";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [sort, setSort] = useState(featuredQuestionsSortingOptions[0]);
  const [sortingOrder, setSortingOrder] = useState(sortingOrders[0]);

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
      console.error("Error fetching data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getFeaturedQuestions();
  }, [sort, sortingOrder]);

  return (
    <MyStack>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={5}
      >
        <TabHeading>Featured Questions</TabHeading>

        <SiteInfoButton />
      </XStack>

      {questions?.length > 0 && (
        <Sort
          sort={sort}
          setSort={setSort}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
          data={featuredQuestionsSortingOptions}
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
