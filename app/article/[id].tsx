import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";

import CustomMarkdown from "../../components/CustomMarkdown";
import GoBack from "../../components/GoBack";
import { MyScroll } from "../../components/MyScroll";
import Post from "../../components/Post";

const Article = () => {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState({});

  const getArticle = async () => {
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/articles/${id}?`,
        {
          params: {
            order: "desc",
            sort: "activity",
            site: "stackoverflow",
            filter: "!nNPvSNVmVR",
            key: process.env.EXPO_PUBLIC_API_KEY
          }
        }
      );

      setArticle(response.data.items[0]);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <MyScroll>
      <GoBack />

      <Post
        type="article"
        {...article}
        isExternal
      />

      <YStack paddingHorizontal={15}>
        <CustomMarkdown>{article?.body_markdown}</CustomMarkdown>
      </YStack>
    </MyScroll>
  );
};

export default Article;
