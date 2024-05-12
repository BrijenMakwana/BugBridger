import { Dispatch, SetStateAction } from "react";
import { ArrowDown10, ArrowUp01 } from "@tamagui/lucide-icons";
import { ToggleGroup, XStack } from "tamagui";

import SortingOptions from "./SortingOptions";

import { isTablet } from "@/utils/utils";

interface ISort {
  data: string[];
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  sortingOrder: string;
  setSortingOrder: Dispatch<SetStateAction<string>>;
}

const Sort = (props: ISort) => {
  const { sort, setSort, sortingOrder, setSortingOrder, data } = props;

  return (
    <XStack
      gap={20}
      alignItems="center"
      justifyContent="space-between"
      marginVertical={15}
      paddingHorizontal={10}
      animation="quick"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
      width={isTablet ? "50%" : "100%"}
    >
      <SortingOptions
        sort={sort}
        setSort={setSort}
        data={data}
      />

      <ToggleGroup
        type="single"
        value={sortingOrder}
        onValueChange={setSortingOrder}
        theme="green"
        flex={1}
        size="$1.5"
        orientation="horizontal"
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
