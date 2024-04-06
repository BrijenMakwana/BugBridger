import React from "react";
import { YStack } from "tamagui";

import CustomMarkdown from "./CustomMarkdown";
import PostCreationInfo, { IOwner, POST_TYPE } from "./PostCreationInfo";

export interface IComment {
  body_markdown: string;
  owner: IOwner;
  creation_date: Date;
}

const CommentCard = (props: IComment) => {
  const { body_markdown, owner, creation_date } = props;

  return (
    <YStack
      padding={15}
      gap={13}
      animation="quick"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
    >
      <CustomMarkdown>{body_markdown}</CustomMarkdown>

      <PostCreationInfo
        type={POST_TYPE.COMMENT}
        creationDate={creation_date}
        isPressable={false}
        {...owner}
      />
    </YStack>
  );
};

export default CommentCard;
