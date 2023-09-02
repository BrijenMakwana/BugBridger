import { Check, Delete } from "@tamagui/lucide-icons";
import {
  Button,
  H3,
  Label,
  Sheet,
  Slider,
  Switch,
  Text,
  XStack,
  YStack
} from "tamagui";

const CustomSlider = (props) => {
  const { title, value, setValue } = props;
  return (
    <>
      <Text
        textTransform="capitalize"
        fontSize={16}
      >
        {title}
      </Text>

      <Slider
        defaultValue={[10]}
        min={1}
        max={50}
        step={1}
        theme="green"
        value={value}
        onValueChange={setValue}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb
          circular
          index={0}
          size="$4"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#fff"
        >
          <Text
            fontWeight="500"
            fontSize={15}
          >
            {value}
          </Text>
        </Slider.Thumb>
      </Slider>
    </>
  );
};

const SearchFiltersSheet = (props) => {
  const {
    open,
    setOpen,
    isAcceptedAnswer,
    setIsAcceptedAnswer,
    minAnswers,
    setMinAnswers,
    minViews,
    setMinViews
  } = props;

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="bouncy"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame>
        <YStack
          gap={40}
          padding={20}
          flex={1}
        >
          <H3
            textTransform="capitalize"
            color="$green10Dark"
          >
            advance search filters
          </H3>

          <XStack
            alignItems="center"
            justifyContent="space-between"
          >
            <Label
              htmlFor="accepted"
              textTransform="capitalize"
              marginRight={20}
              fontSize={16}
              flex={1}
            >
              accepted answers only
            </Label>

            <Switch
              id="accepted"
              backgroundColor={
                isAcceptedAnswer ? "$green10Dark" : "$backgroundPress"
              }
              checked={isAcceptedAnswer}
              onCheckedChange={setIsAcceptedAnswer}
            >
              <Switch.Thumb
                animation="quick"
                backgroundColor="#fff"
              />
            </Switch>
          </XStack>

          <CustomSlider
            title="minimum answers"
            value={minAnswers}
            setValue={setMinAnswers}
          />
          <CustomSlider
            title="minimum views"
            value={minViews}
            setValue={setMinViews}
          />

          <XStack
            marginTop="auto"
            alignItems="center"
            gap={15}
          >
            <Button
              marginTop="auto"
              icon={Delete}
              flex={1}
              scaleIcon={1.3}
            >
              Clear
            </Button>

            <Button
              theme="green"
              icon={Check}
              flex={1}
              scaleIcon={1.3}
            >
              Apply
            </Button>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};

export default SearchFiltersSheet;
