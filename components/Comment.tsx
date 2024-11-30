import React from "react";
import { YStack } from "tamagui";

import CustomMarkdown from "./CustomMarkdown";
import PostCreationInfo from "./PostCreationInfo";

import { IComment } from "@/types";

const Comment = (props: IComment) => {
  const { body_markdown, owner, creation_date } = props;

  return (
    <YStack
      padding={15}
      gap={13}
    >
      <CustomMarkdown>{body_markdown}</CustomMarkdown>

      <PostCreationInfo
        creationDate={creation_date}
        isPressable={false}
        {...owner}
      />
    </YStack>
  );
};

export default Comment;
