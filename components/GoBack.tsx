import { ChevronLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button } from "tamagui";

const GoBack = () => {
  const goBack = () => {
    router.back();
  };

  return (
    <Button
      icon={ChevronLeft}
      color="$green10Dark"
      scaleIcon={1.3}
      animation="bouncy"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
      marginLeft={5}
      onPress={goBack}
      alignSelf="flex-start"
    />
  );
};

export default GoBack;
