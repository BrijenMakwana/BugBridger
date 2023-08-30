import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { Adapt, Select, Sheet } from "tamagui";

const CustomSelect = (props) => {
  const { title, data, sort, setSort } = props;

  return (
    <Select
      id={title}
      value={sort}
      onValueChange={setSort}
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
              {title}
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

export default CustomSelect;
