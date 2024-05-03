import { useState } from "react";
import { decode } from "html-entities";
import moment from "moment";
import { Avatar, Button, Text, YStack } from "tamagui";

import { IOwner } from "../types";
import { formatNumber } from "../utils/utils";

import UserSheet from "./UserSheet";

interface IPostCreationInfo extends IOwner {
  type: POST_TYPE;
  creationDate: Date;
  isPressable?: boolean;
}

export enum POST_TYPE {
  QUESTION = "asked",
  ANSWER = "answered",
  COMMENT = "commented"
}

const PostCreationInfo = (props: IPostCreationInfo) => {
  const {
    user_id,
    type,
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
          onPress={isPressable ? () => setUserSheetIsOpen(true) : undefined}
        >
          <Avatar
            circular
            size="$2"
          >
            <Avatar.Image src={profile_image} />
            <Avatar.Fallback bc="$green10Dark" />
          </Avatar>

          <Text
            fontSize="$3"
            color="$green10Dark"
            fontWeight="500"
          >
            {decode(display_name)}
          </Text>

          <Text
            fontSize="$2"
            color="$gray11Dark"
            fontWeight="500"
          >
            {formatNumber(reputation)}
          </Text>
        </Button>

        <Text
          fontSize="$2"
          color="$gray11Dark"
        >
          {type} on {moment(moment.unix(creationDate)).format("lll")}
        </Text>
      </YStack>

      {userSheetIsOpen && (
        <UserSheet
          open={userSheetIsOpen}
          setOpen={setUserSheetIsOpen}
          userID={user_id}
        />
      )}
    </>
  );
};

export default PostCreationInfo;
