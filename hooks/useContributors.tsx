import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IContributor } from "@/types";

const useContributors = (repoUrl: string) => {
  const getContributors = async (): Promise<IContributor[]> => {
    const response = await axios.get(`${repoUrl}/contributors`);

    return response.data;
  };

  return useQuery({
    queryKey: [`${repoUrl} contributors`],
    queryFn: getContributors
  });
};

export default useContributors;
