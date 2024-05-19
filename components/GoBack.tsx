import { ChevronLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button } from "tamagui";

const GoBack = () => {
  return (
    <Button
      icon={ChevronLeft}
      scaleIcon={1.3}
      animation="bouncy"
      alignSelf="flex-start"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
      onPress={() => router.back()}
    />
  );
};

export default GoBack;
