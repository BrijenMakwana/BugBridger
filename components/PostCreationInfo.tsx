import { useState } from "react";
import { decode } from "html-entities";
import moment from "moment";
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
          {moment(moment.unix(creationDate)).format("lll")}
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
