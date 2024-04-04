import { Text, YStack } from "tamagui";

import GoBack from "./GoBack";

const Error = () => {
  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      flex={1}
      gap={20}
    >
      <Text
        color="$green10"
        fontSize={20}
        textTransform="capitalize"
        textAlign="center"
        fontWeight={"500"}
      >
        something went wrong!
      </Text>

      <GoBack />
    </YStack>
  );
};

export default Error;
