import { ChevronLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button } from "tamagui";

const GoBack = () => {
  return (
    <Button
      icon={ChevronLeft}
      scaleIcon={1.3}
      alignSelf="flex-start"
      onPress={() => router.back()}
    />
  );
};

export default GoBack;
