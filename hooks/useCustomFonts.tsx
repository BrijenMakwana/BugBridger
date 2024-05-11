import { useFonts } from "expo-font";

const useCustomFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  });

  return {
    fontsLoaded,
    fontError
  };
};

export default useCustomFonts;
