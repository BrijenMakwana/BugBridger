import { useEffect, useState } from "react";
import { Award } from "@tamagui/lucide-icons";
import axios from "axios";
import moment from "moment";
import {
  Avatar,
  H3,
  ListItem,
  Separator,
  Sheet,
  Spinner,
  Text,
  XStack,
  YGroup,
  YStack
} from "tamagui";

const BadgeInfo = (props) => {
  const { badgeType, badgeCount, badgeColor } = props;
  return (
    <YGroup.Item>
      <ListItem
        hoverTheme
        icon={<Award size="$2" />}
        size="$4"
        title={badgeCount}
        subTitle={`${badgeType} Badges`}
        backgroundColor="$backgroundTransparent"
        color={badgeColor}
      />
    </YGroup.Item>
  );
};

const UserCard = (props) => {
  const { displayName, profileImage, creationDate } = props;
  return (
    <XStack justifyContent="space-between">
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
        >
          {displayName}
        </Text>

        <Text
          fontSize={14}
          marginTop={5}
          color="$gray11Dark"
        >
          Member since {moment(creationDate).format("ll")}
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
      console.error("Error fetching data:", error);
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
      <Sheet.Frame
        flex={1}
        padding={20}
      >
        {!user ? (
          <Spinner
            size="small"
            color="$green10Dark"
          />
        ) : (
          <YStack gap={20}>
            <UserCard
              displayName={user?.display_name}
              profileImage={user?.profile_image}
              creationDate={user?.creation_date}
            />

            <H3 textTransform="capitalize">Badges</H3>

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
