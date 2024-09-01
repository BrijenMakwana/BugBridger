import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IContributor } from "@/types";

const useContributors = (repoUrl: string) => {
  const getContributors = async (): Promise<IContributor[]> => {
    const response = await axios.get(`${repoUrl}/contributors`);

    return response.data;
  };

  const { data, ...rest } = useQuery({
    queryKey: [`${repoUrl} contributors`],
    queryFn: getContributors
  });

  return {
    contributors: data,
    ...rest
  };
};

export default useContributors;
