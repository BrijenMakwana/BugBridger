import React, { useState } from "react";
import { decode } from "html-entities";
import dayjs from "dayjs";
import { Avatar, Button, Text, YStack } from "tamagui";

import UserSheet from "./UserSheet";

import { IOwner } from "@/types";
import { formatNumber } from "@/utils/utils";

interface IPostCreationInfo extends IOwner {
  creationDate: number;
  isPressable?: boolean;
}

const PostCreationInfo = (props: IPostCreationInfo) => {
  const {
    user_id,
    display_name,
    profile_image,
    reputation,
    creationDate,
    isPressable = true
  } = props;

  const [userSheetIsOpen, setUserSheetIsOpen] = useState(false);

  return (
    <>
      <YStack
        alignItems="flex-end"
        gap={10}
        flex={1}
      >
        <Button
          unstyled
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          onPress={() => setUserSheetIsOpen(true)}
          disabled={!isPressable}
        >
          <Avatar
            circular
            size="$2"
          >
            <Avatar.Image src={profile_image} />
            <Avatar.Fallback bc="$green10Dark" />
          </Avatar>

          <Text
            color="$green10Dark"
            fontWeight="500"
          >
            {decode(display_name)}
          </Text>

          <Text
            color="$gray11Dark"
            fontWeight="500"
          >
            {formatNumber(reputation)}
          </Text>
        </Button>

        <Text
          color="$gray11Dark"
          fontSize="$3"
        >
          {dayjs(creationDate * 1000).format("MMM D, YYYY h:mm A")}
        </Text>
      </YStack>

      {userSheetIsOpen && (
        <UserSheet
          open={userSheetIsOpen}
          setOpen={setUserSheetIsOpen}
          userId={user_id}
        />
      )}
    </>
  );
};

export default PostCreationInfo;
