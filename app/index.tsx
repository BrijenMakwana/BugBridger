import { useEffect } from "react";
import axios from "axios";
import { Redirect, useRouter } from "expo-router";

import { MyStack } from "../components/MyStack";
import QuestionCard from "../components/QuestionCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const searchQuestion = async () => {
    try {
      const response = await axios.get(
        "https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&q=expo%20metro%20is%20not%20starting&site=stackoverflow"
      );

      // Handle the response data here
      console.log("Response data:", response.data.items);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    searchQuestion();
  });

  return (
    <MyStack>
      <SearchBar />
    </MyStack>
  );
}
