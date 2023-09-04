import { useEffect, useState } from "react";
import { RefreshControl, ToastAndroid } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";
import axios from "axios";

import { MyStack } from "../../components/MyStack";
import Post from "../../components/Post";
import Sort from "../../components/Sort";
import TabHeading from "../../components/TabHeading";
import {
  ARTICLES_SORTING_OPTIONS,
  SORTING_ORDERS
} from "../../constants/sorting";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [sort, setSort] = useState<string>(ARTICLES_SORTING_OPTIONS[0]);
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const getFeaturedArticles = async () => {
    setIsSearching(true);

    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/articles?",
        {
          params: {
            order: sortingOrder,
            sort: sort,
            site: "stackoverflow",
            filter: "!--6Pp2.y.pct",
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setArticles(response.data.items);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getFeaturedArticles();
  }, [sort, sortingOrder]);

  return (
    <MyStack>
      {articles?.length > 0 && (
        <Sort
          sort={sort}
          setSort={setSort}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
          data={ARTICLES_SORTING_OPTIONS}
        />
      )}

      <FlashList
        data={articles}
        renderItem={({ item }) => (
          <Post
            type="article"
            {...item}
          />
        )}
        estimatedItemSize={50}
        refreshControl={
          <RefreshControl
            refreshing={isSearching}
            colors={[darkColors.green11]}
            progressBackgroundColor={darkColors.gray5}
            onRefresh={getFeaturedArticles}
          />
        }
      />
    </MyStack>
  );
};

export default Home;
