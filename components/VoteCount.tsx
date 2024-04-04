import { TrendingUp } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

interface IVoteCount {
  vote: number;
  isAccepted: boolean;
}

const VoteCount = (props: IVoteCount) => {
  const { vote, isAccepted } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      backgroundColor={isAccepted ? "$green10Dark" : "$backgroundPress"}
      paddingVertical={5}
      paddingHorizontal={15}
      borderRadius={5}
      gap={10}
    >
      <TrendingUp size="$1" />
      <Text fontSize={13}>{vote}</Text>
    </XStack>
  );
};

export default VoteCount;
