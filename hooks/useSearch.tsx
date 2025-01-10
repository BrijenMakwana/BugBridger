import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { QUESTIONS_SORTING_OPTIONS, SORTING_ORDERS } from "@/constants";
import { IQuestion } from "@/types";

const useSearch = () => {
  const [searchQuestion, setSearchQuestion] = useState("");
  const [sort, setSort] = useState<string>(QUESTIONS_SORTING_OPTIONS[0]);
  const [sortingOrder, setSortingOrder] = useState<string>(SORTING_ORDERS[0]);

  const [searchFilterIsApplied, setSearchFilterIsApplied] = useState(false);
  const [isAcceptedAnswer, setIsAcceptedAnswer] = useState(false);
  const [minAnswers, setMinAnswers] = useState<number[]>([10]);
  const [minViews, setMinViews] = useState<number[]>([10]);

  const searchQuestions = async (): Promise<IQuestion[]> => {
    if (!searchQuestion) return [];

    const response = await axios.get(
      "https://api.stackexchange.com/2.3/search/advanced",
      {
        params: {
          q: searchQuestion,
          order: sortingOrder,
          sort: sort,
          site: "stackoverflow",
          filter: "!7vXVX*mzcfem2OT0*5LAwQdhdFSw1HC7_f",
          pageSize: 100,
          key: process.env.EXPO_PUBLIC_API_KEY,

          ...(searchFilterIsApplied && {
            accepted: isAcceptedAnswer,
            answers: minAnswers[0],
            views: minViews[0]
          })
        }
      }
    );

    return response.data.items;
  };

  const searchResult = useQuery({
    queryKey: ["searchQuestions", sort, sortingOrder, searchFilterIsApplied],
    queryFn: searchQuestions
  });

  return {
    ...searchResult,
    searchQuestion,
    setSearchQuestion,
    sort,
    setSort,
    sortingOrder,
    setSortingOrder,
    searchFilterIsApplied,
    setSearchFilterIsApplied,
    isAcceptedAnswer,
    setIsAcceptedAnswer,
    minAnswers,
    setMinAnswers,
    minViews,
    setMinViews,
    searchQuestions
  };
};

export default useSearch;
