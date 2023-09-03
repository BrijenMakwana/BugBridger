import { Dispatch, FC, SetStateAction } from "react";
import { Delete, Search } from "@tamagui/lucide-icons";
import { Button, Input, XStack } from "tamagui";

interface ISearchBar {
  setSearchQuestion: Dispatch<SetStateAction<string>>;
  searchQuestion: string;
  onPress: () => void;
  onClear: () => void;
}

const SearchBar: FC<ISearchBar> = (props) => {
  const { setSearchQuestion, searchQuestion, onPress, onClear } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      marginHorizontal={5}
      gap={10}
    >
      <Input
        size="$4"
        borderWidth={1}
        placeholder="Type your question here"
        theme="green"
        flex={1}
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
            theme="green"
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
