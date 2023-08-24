import { Text } from "tamagui";

const Tag = ({ children }) => {
  return (
    <Text
      fontSize="$4"
      backgroundColor="$backgroundPress"
      paddingHorizontal={15}
      paddingVertical={5}
      color="$green10Dark"
      fontWeight="500"
      borderRadius="$10"
    >
      {children}
    </Text>
  );
};

export default Tag;
