import { Search } from "@tamagui/lucide-icons";
import { Button, Input, XStack } from "tamagui";

const SearchBar = () => {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      padding={10}
    >
      <Input
        size="$4"
        borderWidth={1}
        backgroundColor="$backgroundTransparent"
        flex={1}
        borderColor="$gray10Dark"
        focusStyle={{
          borderColor: "$green10Dark"
        }}
      />

      <Button
        alignSelf="center"
        icon={Search}
        size="$4"
        backgroundColor="$green10Dark"
        marginLeft={10}
        animation="bouncy"
      >
        Search
      </Button>
    </XStack>
  );
};

export default SearchBar;
