import React, { Dispatch, SetStateAction, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { MessageCircle } from "@tamagui/lucide-icons";
import { Button, H2, Separator, Sheet } from "tamagui";
import Comment from "./Comment";
import { IComment } from "@/types";

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
          renderItem={({ item }) => <Comment {...item} />}
          estimatedItemSize={5}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
          ListHeaderComponent={<H2>Comments ({comments.length})</H2>}
          ItemSeparatorComponent={Separator}
        />
      </Sheet.Frame>
    </Sheet>
  );
};

const CommentsButton = (props: ICommentsButton) => {
  const { comments } = props;

  const [commentsSheetIsOpen, setCommentsSheetIsOpen] = useState(false);

  const commentsAvailable = comments?.length > 0;

  return (
    <>
      <Button
        onPress={() => setCommentsSheetIsOpen(true)}
        disabled={!commentsAvailable}
        icon={<MessageCircle />}
        scaleIcon={1.2}
        alignSelf="flex-end"
        opacity={commentsAvailable ? 1 : 0.5}
        chromeless
      >
        {commentsAvailable ? `${comments?.length} Comments` : "No Comments"}
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
