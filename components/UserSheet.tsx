import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { Award } from "@tamagui/lucide-icons";
import axios from "axios";
import { decode } from "html-entities";
import moment from "moment";
import {
  Avatar,
  H3,
  ListItem,
  Separator,
  Sheet,
  Spinner,
  Text,
  XGroup,
  XStack,
  YGroup,
  YStack
} from "tamagui";

import { formatNumber } from "../utils/utils";

import ExternalButton from "./ExternalButton";

const UserStat = (props) => {
  const { count, title } = props;

  return (
    <XGroup.Item>
      <ListItem
        size="$4"
        title={formatNumber(count)}
        subTitle={title}
        flex={1}
        backgroundColor="$backgroundTransparent"
      />
    </XGroup.Item>
  );
};

const BadgeInfo = (props) => {
  const { badgeType, badgeCount, badgeColor } = props;

  return (
    <YGroup.Item>
      <ListItem
        icon={<Award size="$2" />}
        size="$4"
        title={badgeCount}
        subTitle={`${badgeType} Badges`}
        color={badgeColor}
        backgroundColor="$backgroundTransparent"
      />
    </YGroup.Item>
  );
};

const UserCard = (props) => {
  const { displayName, profileImage, creationDate } = props;
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
    >
      <Avatar
        circular
        size="$7"
      >
        <Avatar.Image src={profileImage} />
        <Avatar.Fallback bc="$green10Dark" />
      </Avatar>

      <YStack
        flex={1}
        paddingLeft={20}
      >
        <Text
          color="$green10Dark"
          fontSize={30}
          numberOfLines={2}
        >
          {decode(displayName)}
        </Text>

        <Text
          fontSize={14}
          marginTop={5}
          color="$gray11Dark"
        >
          Joined {moment(moment.unix(creationDate), "YYYYMMDD").fromNow()}
        </Text>
      </YStack>
    </XStack>
  );
};

const UserSheet = (props) => {
  const { open, setOpen, userID } = props;
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://api.stackexchange.com/2.3/users/${userID}?`,

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

      setUser(response.data.items[0]);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="bouncy"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame>
        {!user ? (
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
            <UserCard
              displayName={user?.display_name}
              profileImage={user?.profile_image}
              creationDate={user?.creation_date}
            />

            <H3 textTransform="capitalize">stats</H3>
            <XGroup
              bordered
              separator={<Separator vertical />}
            >
              <UserStat
                count={user?.reputation}
                title="Reputation"
              />
              <UserStat
                count={user?.answer_count}
                title="Answers"
              />
              <UserStat
                count={user?.question_count}
                title="Questions"
              />
            </XGroup>

            <H3 textTransform="capitalize">badges</H3>
            <YGroup
              bordered
              separator={<Separator />}
            >
              <BadgeInfo
                badgeType="Gold"
                badgeCount={user?.badge_counts.gold}
                badgeColor="#FFD700"
              />
              <BadgeInfo
                badgeType="Silver"
                badgeCount={user?.badge_counts.silver}
                badgeColor="#C0C0C0"
              />
              <BadgeInfo
                badgeType="Bronze"
                badgeCount={user?.badge_counts.bronze}
                badgeColor="#CD7F32"
              />
            </YGroup>

            <ExternalButton link={user?.link} />
          </YStack>
        )}
      </Sheet.Frame>
    </Sheet>
  );
};

export default UserSheet;
