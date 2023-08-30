import { Label, XStack } from "tamagui";

import CustomSelect from "./CustomSelect";

const SortingOptions = (props) => {
  const { title, data, sort, setSort } = props;
  return (
    <XStack
      alignItems="center"
      alignSelf="flex-end"
      flex={1}
    >
      <Label
        marginRight={20}
        fontSize={15}
      >
        {title}
      </Label>
      <CustomSelect
        title={title}
        data={data}
        sort={sort}
        setSort={setSort}
      />
    </XStack>
  );
};

export default SortingOptions;
