import { Dispatch, SetStateAction } from "react";
import { ToastAndroid } from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { H3, Sheet, Spinner, Text, XStack, YStack } from "tamagui";

import { formatNumber, formatText } from "../utils/utils";

interface IInfoCard {
  title: string;
  value: number;
}

interface ISiteInfoSheet {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const InfoItem = (props: IInfoCard) => {
  const { title, value } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        flex={1}
        fontSize={15}
        textTransform="capitalize"
      >
        {formatText(title)}
      </Text>

      <Text
        fontSize={15}
        color="$green10Dark"
        fontWeight="500"
      >
        {formatNumber(value)}
      </Text>
    </XStack>
  );
};

const SiteInfoSheet = (props: ISiteInfoSheet) => {
  const { open, setOpen } = props;

  const getSiteInfo = async () => {
    try {
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
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const { isPending, data: siteInfo } = useQuery({
    queryKey: ["siteData"],
    queryFn: getSiteInfo
  });

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="quick"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame>
        {isPending ? (
          <Spinner
            size="large"
            color="$green10Dark"
          />
        ) : (
          <YStack
            gap={20}
            padding={20}
            flex={1}
          >
            <H3 textTransform="capitalize">stackoveflow statistics</H3>

            {Object.keys(siteInfo).map((item, index) => (
              <InfoItem
                key={index}
                value={siteInfo[item]}
                title={item}
              />
            ))}
          </YStack>
        )}
      </Sheet.Frame>
    </Sheet>
  );
};

export default SiteInfoSheet;
