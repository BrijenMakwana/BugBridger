import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGitRepo = (repoUrl: string) => {
  const getGitRepo = async () => {
    const response = await axios.get(repoUrl);

    return response.data;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["gitRepoData"],
    queryFn: getGitRepo
  });

  return {
    gitRepo: data,
    ...rest
  };
};

export default useGitRepo;
