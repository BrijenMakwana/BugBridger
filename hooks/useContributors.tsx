import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useContributors = (repoUrl: string) => {
  const getContributors = async () => {
    const response = await axios.get(`${repoUrl}/contributors`);

    return response.data;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["contributorsData"],
    queryFn: getContributors
  });

  return {
    contributors: data,
    ...rest
  };
};

export default useContributors;
