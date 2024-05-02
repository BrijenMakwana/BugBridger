import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IQuestion } from "../types";

const useQuestion = (questionId: string | string[]) => {
  const getQuestion = async (): Promise<IQuestion> => {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/questions/${questionId}?`,
      {
        params: {
          order: "desc",
          sort: "activity",
          site: "stackoverflow",
          filter: "!7vXVX*mzcfem2OT0*5LAwQdhdFSw1HC7_f",
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      }
    );

    return response.data.items[0];
  };

  const { data, ...rest } = useQuery({
    queryKey: ["questionData"],
    queryFn: getQuestion
  });

  return {
    question: data,
    ...rest
  };
};

export default useQuestion;
