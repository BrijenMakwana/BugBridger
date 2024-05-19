import { Link } from "expo-router";
import { Text } from "tamagui";

interface ITag {
  children: string;
}

const Tag = ({ children }: ITag) => {
  return (
    <Link
      href={`/tagged-questions/${children}`}
      asChild
    >
      <Text
        fontSize="$4"
        backgroundColor="$backgroundPress"
        paddingHorizontal={15}
        paddingVertical={5}
        color="$green10Dark"
        fontWeight="500"
        borderRadius="$10"
        pressStyle={{ backgroundColor: "white" }}
      >
        {children}
      </Text>
    </Link>
  );
};

export default Tag;
