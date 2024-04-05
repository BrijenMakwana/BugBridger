import { Dispatch, SetStateAction, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { MessageCircle } from "@tamagui/lucide-icons";
import { Button, H2, Separator, Sheet, Text } from "tamagui";

import CommentCard, { IComment } from "./CommentCard";

interface ICommentsButton {
  comments: IComment[];
}

interface ICommmentsSheet extends ICommentsButton {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CommmentsSheet = (props: ICommmentsSheet) => {
  const { open, setOpen, comments } = props;

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
        <FlashList
          data={comments}
          renderItem={({ item }) => <CommentCard {...item} />}
          estimatedItemSize={5}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingVertical: 20
          }}
          ListHeaderComponent={() => <H2 color="$green10Dark">Comments</H2>}
          ItemSeparatorComponent={() => <Separator />}
        />
      </Sheet.Frame>
    </Sheet>
  );
};

const CommentsButton = (props: ICommentsButton) => {
  const { comments } = props;

  const [commentsSheetIsOpen, setCommentsSheetIsOpen] = useState(false);

  return (
    <>
      <Button
        onPress={
          comments?.length > 0 ? () => setCommentsSheetIsOpen(true) : undefined
        }
        icon={<MessageCircle />}
        scaleIcon={1.2}
        alignSelf="flex-end"
        opacity={comments?.length > 0 ? 1 : 0.5}
      >
        {(comments?.length || 0) + " Comments"}
      </Button>

      {commentsSheetIsOpen && (
        <CommmentsSheet
          open={commentsSheetIsOpen}
          setOpen={setCommentsSheetIsOpen}
          comments={comments}
        />
      )}
    </>
  );
};

export default CommentsButton;
