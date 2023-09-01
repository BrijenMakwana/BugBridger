import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { H2, XStack } from "tamagui";

import { articlesSortingOptions, sortingOrders } from "../../assets/data";
import { MyStack } from "../../components/MyStack";
import Post from "../../components/Post";
import SortingOptions from "../../components/SortingOptions";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [sort, setSort] = useState(articlesSortingOptions[0]);
  const [sortingOrder, setSortingOrder] = useState(sortingOrders[0]);

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
      console.error("Error fetching data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getFeaturedArticles();
  }, [sort, sortingOrder]);

  return (
    <MyStack>
      <H2
        color="$green10Dark"
        textTransform="capitalize"
        marginVertical={10}
        marginLeft={5}
      >
        Featured Articles
      </H2>

      {articles?.length > 0 && (
        <XStack
          gap={20}
          alignItems="center"
          justifyContent="space-between"
          marginBottom={15}
          marginHorizontal={10}
          animation="quick"
          enterStyle={{
            scale: 0.5,
            opacity: 0
          }}
        >
          <SortingOptions
            sort={sort}
            setSort={setSort}
            data={articlesSortingOptions}
            title="Sort"
          />
          <SortingOptions
            sort={sortingOrder}
            setSort={setSortingOrder}
            data={sortingOrders}
            title="Order"
          />
        </XStack>
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
