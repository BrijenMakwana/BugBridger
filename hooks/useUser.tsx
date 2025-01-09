import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = (userId: number) => {
  const getUser = async () => {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/users/${userId}?`,

      {
        params: {
          order: "desc",
          sort: "reputation",
          site: "stackoverflow",
          filter: "!)scV0Xk0jsmonefL_TsZ",
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      }
    );

    return response.data.items[0];
  };

  const { data, ...rest } = useQuery({
    queryKey: ["user", userId],
    queryFn: getUser
  });

  return {
    user: data,
    ...rest
  };
};

export default useUser;
