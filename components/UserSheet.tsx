import { Dispatch, SetStateAction } from "react";
import { Award } from "@tamagui/lucide-icons";
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

import useUser from "../hooks/useUser";

import Error from "./Error";
import StatisticItem from "./StatisticItem";

interface IUserSheet {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
}

interface IUserInfo {
  displayName: string;
  profileImage: string;
  creationDate: number;
}

interface IBadgeInfo {
  badgeType: "Gold" | "Silver" | "Bronze";
  badgeCount: number;
  badgeColor: string;
}

const BadgeInfo = (props: IBadgeInfo) => {
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

const UserInfo = (props: IUserInfo) => {
  const { displayName, profileImage, creationDate } = props;

  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      gap={20}
    >
      <Avatar
        circular
        size="$7"
      >
        <Avatar.Image src={profileImage} />
        <Avatar.Fallback bc="$green10Dark" />
      </Avatar>

      <YStack flex={1}>
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

const UserSheet = (props: IUserSheet) => {
  const { open, setOpen, userId } = props;

  const { user, isFetching, isError, refetch } = useUser(userId);

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
        {isFetching && (
          <Spinner
            size="large"
            color="$green10Dark"
          />
        )}

        {!isFetching && isError && <Error refetch={refetch} />}

        {!isFetching && !isError && (
          <YStack
            gap={20}
            padding={20}
            flex={1}
          >
            <UserInfo
              displayName={user?.display_name}
              profileImage={user?.profile_image}
              creationDate={user?.creation_date}
            />

            <H3 textTransform="capitalize">stats</H3>
            <XGroup
              bordered
              separator={<Separator vertical />}
            >
              <StatisticItem
                title={user?.reputation}
                subTitle="Reputation"
              />
              <StatisticItem
                title={user?.answer_count}
                subTitle="Answers"
              />
              <StatisticItem
                title={user?.question_count}
                subTitle="Questions"
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
          </YStack>
        )}
      </Sheet.Frame>
    </Sheet>
  );
};

export default UserSheet;
