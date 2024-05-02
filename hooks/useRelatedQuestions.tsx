import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IRelatedQuestion } from "../components/RelatedQuestion";

const useRelatedQuestions = (questionId: string | string[]) => {
  const getRelatedQuestions = async (): Promise<IRelatedQuestion[]> => {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/questions/${questionId}/related?`,
      {
        params: {
          order: "desc",
          sort: "activity",
          site: "stackoverflow",
          filter: "!szz-rpK9Axv5zb.Gmodt6fEhGVd-MSW",
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      }
    );

    return response.data.items;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["relatedQuestionsData"],
    queryFn: getRelatedQuestions
  });

  return {
    relatedQuestions: data,
    ...rest
  };
};

export default useRelatedQuestions;
