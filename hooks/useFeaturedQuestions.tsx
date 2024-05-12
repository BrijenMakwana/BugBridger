import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IQuestion } from "@/types";

const useFeaturedQuestions = (sortingOrder: string, sort: string) => {
  const getFeaturedQuestions = async (): Promise<IQuestion[]> => {
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
  };

  const { data, ...rest } = useQuery({
    queryKey: ["questionsData", sort, sortingOrder],
    queryFn: getFeaturedQuestions
  });

  return {
    questions: data,
    ...rest
  };
};

export default useFeaturedQuestions;
