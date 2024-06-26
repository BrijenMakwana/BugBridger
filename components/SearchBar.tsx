import { Dispatch, SetStateAction } from "react";
import { Delete, Search } from "@tamagui/lucide-icons";
import { Button, Input, XStack } from "tamagui";

interface ISearchBar {
  setSearchQuestion: Dispatch<SetStateAction<string>>;
  searchQuestion: string;
  onPress: () => void;
  onClear: () => void;
}

const SearchBar = (props: ISearchBar) => {
  const { setSearchQuestion, searchQuestion, onPress, onClear } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={5}
      gap={10}
      marginTop={10}
      animation="quick"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
    >
      <Input
        size="$4"
        borderWidth={1}
        placeholder="Type your question here"
        theme="green"
        flex={1}
        value={searchQuestion}
        onChangeText={setSearchQuestion}
        onSubmitEditing={onPress}
      />

      <Button
        icon={Delete}
        size="$4"
        theme="red"
        onPress={onClear}
      />
      <Button
        icon={Search}
        size="$4"
        theme="green"
        onPress={onPress}
      />
    </XStack>
  );
};

export default SearchBar;
