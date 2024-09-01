import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IQuestion } from "@/types";

const useTaggedQuestions = (tag: string | string[]) => {
  const getTaggedQuestions = async (): Promise<IQuestion[]> => {
    const response = await axios.get(
      "https://api.stackexchange.com/2.3/questions?",
      {
        params: {
          order: "desc",
          sort: "activity",
          site: "stackoverflow",
          filter: "!nNPvSNP4(R",
          tagged: tag,
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      }
    );

    return response.data.items;
  };

  const { data, ...rest } = useQuery({
    queryKey: [`${tag} questions`],
    queryFn: getTaggedQuestions
  });

  return {
    questions: data,
    ...rest
  };
};

export default useTaggedQuestions;
