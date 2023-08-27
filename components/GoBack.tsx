import { ArrowLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button } from "tamagui";

const GoBack = () => {
  const goBack = () => {
    router.back();
  };

  return (
    <Button
      icon={ArrowLeft}
      backgroundColor="$green10Dark"
      animation="bouncy"
      enterStyle={{
        scale: 0.5,
        opacity: 0
      }}
      marginBottom={15}
      marginLeft={5}
      onPress={goBack}
      borderRadius={25}
      width={50}
      height={50}
    />
  );
};

export default GoBack;
