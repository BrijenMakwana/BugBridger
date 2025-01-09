import { RefreshCcw } from "@tamagui/lucide-icons";
import { Button, Text, YStack } from "tamagui";

interface IError {
  error: Error;
  refetch: () => void;
}

const Error = (props: IError) => {
  const { error, refetch } = props;

  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      flex={1}
      gap={20}
    >
      <Text
        color="$red10Dark"
        fontSize={20}
        textTransform="capitalize"
        textAlign="center"
        fontWeight={"500"}
      >
        {error.message}
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
