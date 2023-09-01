import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";
import axios from "axios";
import { H2 } from "tamagui";

import { MyStack } from "../../components/MyStack";
import Post from "../../components/Post";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getFeaturedArticles = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/articles?",
        {
          params: {
            order: "desc",
            sort: "activity",
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
  }, []);

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
