import { Info } from "@tamagui/lucide-icons";
import { decode } from "html-entities";
import { Card, Text } from "tamagui";
import { IPostNotice } from "@/types";

const PostNotice = (props: IPostNotice) => {
  const { body } = props;

  const bodyWithoutHTMLTags = body.replace(/<[^>]*>/g, "");

  return (
    <Card
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap={10}
      theme="red"
      padding={15}
    >
      <Info />

      <Text
        fontSize={15}
        flex={1}
        lineHeight={22}
      >
        {decode(bodyWithoutHTMLTags)}
      </Text>
    </Card>
  );
};

export default PostNotice;
