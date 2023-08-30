import { Delete, Search } from "@tamagui/lucide-icons";
import { Button, Input, XStack } from "tamagui";

const SearchBar = (props) => {
  const { setSearchQuestion, searchQuestion, onPress, onClear } = props;
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      marginHorizontal={5}
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
        onSubmitEditing={onPress}
      />

      {searchQuestion && (
        <>
          <Button
            icon={Delete}
            size="$4"
            theme="red"
            marginLeft={10}
            animation="quick"
            onPress={onClear}
            enterStyle={{
              scale: 0.5,
              opacity: 0
            }}
          />
          <Button
            icon={Search}
            size="$4"
            backgroundColor="$green10Dark"
            marginLeft={10}
            animation="quick"
            onPress={onPress}
            enterStyle={{
              scale: 0.5,
              opacity: 0
            }}
          />
        </>
      )}
    </XStack>
  );
};

export default SearchBar;
