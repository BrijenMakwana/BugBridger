import { Suspense, useEffect } from "react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, Text, Theme } from "tamagui";

import { MySafeAreaView } from "../components/MySafeAreaView";
import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Theme name="dark">
          <ThemeProvider value={DarkTheme}>
            <MySafeAreaView>
              <Stack
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name="tabs" />
                <Stack.Screen
                  getId={({ params }) => params.id}
                  name="question/[id]"
                />
                <Stack.Screen
                  getId={({ params }) => params.id}
                  name="article/[id]"
                />
              </Stack>
            </MySafeAreaView>
          </ThemeProvider>
        </Theme>
      </Suspense>
    </TamaguiProvider>
  );
}
