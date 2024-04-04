import { ChevronLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button } from "tamagui";

const GoBack = () => {
  return (
    <Button
      icon={ChevronLeft}
      scaleIcon={1.3}
      animation="bouncy"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
      onPress={() => router.back()}
      alignSelf="flex-start"
    />
  );
};

export default GoBack;
