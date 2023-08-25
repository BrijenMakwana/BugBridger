import { Delete, Search } from "@tamagui/lucide-icons";
import { Button, Input, XStack } from "tamagui";

const SearchBar = (props) => {
  const { setSearchQuestion, searchQuestion, onPress, onClear } = props;
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      padding={10}
    >
      <Input
        size="$4"
        borderWidth={1}
        placeholder="Type your question here"
        backgroundColor="$backgroundTransparent"
        flex={1}
        borderColor="$gray10Dark"
        focusStyle={{
          borderColor: "$green10Dark"
        }}
        value={searchQuestion}
        onChangeText={(text) => setSearchQuestion(text)}
      />

      {searchQuestion && (
        <>
          <Button
            icon={Delete}
            size="$4"
            backgroundColor="$red10Dark"
            marginLeft={10}
            animation="bouncy"
            onPress={onClear}
          />
          <Button
            icon={Search}
            size="$4"
            backgroundColor="$green10Dark"
            marginLeft={10}
            animation="bouncy"
            onPress={onPress}
          />
        </>
      )}
    </XStack>
  );
};

export default SearchBar;
