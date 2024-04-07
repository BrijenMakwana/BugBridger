import { Dispatch, SetStateAction } from "react";
import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { Adapt, Label, Select, Sheet, XStack } from "tamagui";

export interface ISortingOptions {
  data: string[];
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

const CustomSelect = (props: ISortingOptions) => {
  const { data, sort, setSort } = props;

  return (
    <Select
      id="sort"
      value={sort}
      onValueChange={setSort}
      size="$3"
    >
      <Select.Trigger
        iconAfter={ChevronDown}
        theme="green"
        flex={1}
      >
        <Select.Value placeholder={sort} />
      </Select.Trigger>

      <Adapt
        when="sm"
        platform="touch"
      >
        <Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250
          }}
        >
          <Sheet.Frame>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.Viewport>
          <Select.Group>
            <Select.Label
              fontSize={16}
              color="$green10Dark"
            >
              Sort
            </Select.Label>
            {data.map((item, index) => {
              return (
                <Select.Item
                  index={index}
                  key={item}
                  value={item?.toLowerCase()}
                >
                  <Select.ItemText fontSize={14}>{item}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check
                      size={18}
                      color="$green10Dark"
                    />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
};

const SortingOptions = (props: ISortingOptions) => {
  const { data, sort, setSort } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      flex={1}
    >
      <Label
        marginRight={20}
        fontSize={15}
        textTransform="capitalize"
      >
        sort
      </Label>
      <CustomSelect
        data={data}
        sort={sort}
        setSort={setSort}
      />
    </XStack>
  );
};

export default SortingOptions;
