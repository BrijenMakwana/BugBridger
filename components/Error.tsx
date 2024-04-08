import { RefreshCcw } from "@tamagui/lucide-icons";
import { Button, Text, YStack } from "tamagui";

interface IError {
  refetch: () => void;
}

const Error = (props: IError) => {
  const { refetch } = props;

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

      <Button
        icon={RefreshCcw}
        scaleIcon={1.3}
        onPress={refetch}
      >
        Retry
      </Button>
    </YStack>
  );
};

export default Error;
