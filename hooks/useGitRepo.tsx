import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IGitRepo } from "@/types";

const useGitRepo = (repoUrl: string) => {
  const getGitRepo = async (): Promise<IGitRepo> => {
    const response = await axios.get(repoUrl);

    return response.data;
  };

  const { data, ...rest } = useQuery({
    queryKey: [`${repoUrl} repo`],
    queryFn: getGitRepo
  });

  return {
    gitRepo: data,
    ...rest
  };
};

export default useGitRepo;
