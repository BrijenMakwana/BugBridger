import { decode } from "html-entities";
import moment from "moment";
import { Avatar, Text, XStack } from "tamagui";

const PostCreationInfo = (props) => {
  const { type, display_name, profile_image, creationDate } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="flex-end"
      gap={10}
      flex={1}
      flexWrap="wrap"
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
        {type === "question" ? "asked" : "answered"} on{" "}
        {moment(creationDate).format("ll")}
      </Text>
    </XStack>
  );
};

export default PostCreationInfo;
