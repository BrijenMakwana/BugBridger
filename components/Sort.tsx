import { ArrowDown10, ArrowUp01 } from "@tamagui/lucide-icons";
import { ToggleGroup, XStack } from "tamagui";

import SortingOptions from "./SortingOptions";

const Sort = (props) => {
  const { sort, setSort, sortingOrder, setSortingOrder, data } = props;

  return (
    <XStack
      gap={20}
      alignItems="center"
      justifyContent="space-between"
      marginVertical={15}
      marginHorizontal={10}
      animation="quick"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
    >
      <SortingOptions
        sort={sort}
        setSort={setSort}
        data={data}
        title="Sort"
      />

      <ToggleGroup
        type="single"
        value={sortingOrder}
        onValueChange={setSortingOrder}
        theme="green"
        flex={1}
        orientation="horizontal"
        height="95%"
      >
        <ToggleGroup.Item
          value="asc"
          flex={1}
        >
          <ArrowUp01 size="$1" />
        </ToggleGroup.Item>

        <ToggleGroup.Item
          value="desc"
          flex={1}
        >
          <ArrowDown10 size="$1" />
        </ToggleGroup.Item>
      </ToggleGroup>
    </XStack>
  );
};

export default Sort;
