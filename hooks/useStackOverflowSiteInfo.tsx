import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useStackOverflowSiteInfo = () => {
  const getSiteInfo = async () => {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/info?`,
      {
        params: {
          site: "stackoverflow",
          key: process.env.EXPO_PUBLIC_API_KEY
        }
      }
    );

    return response.data.items[0];
  };

  const { data, ...rest } = useQuery({
    queryKey: ["siteData"],
    queryFn: getSiteInfo
  });

  return { siteInfo: data, ...rest };
};

export default useStackOverflowSiteInfo;
