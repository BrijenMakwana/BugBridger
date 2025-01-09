import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IGitRepo } from "@/types";

const useGitRepo = (repoUrl: string) => {
  const getGitRepo = async (): Promise<IGitRepo> => {
    const response = await axios.get(repoUrl);

    return response.data;
  };

  return useQuery({
    queryKey: ["gitRepo", repoUrl],
    queryFn: getGitRepo
  });
};

export default useGitRepo;
