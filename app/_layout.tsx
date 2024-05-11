import { Suspense, useEffect } from "react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, Text } from "tamagui";

import { MySafeAreaView } from "../components/MySafeAreaView";
import useCustomFonts from "../hooks/useCustomFonts";
import config from "../tamagui.config";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { fontsLoaded, fontError } = useCustomFonts();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <TamaguiProvider
      config={config}
      defaultTheme="dark"
    >
      <Suspense fallback={<Text>Loading...</Text>}>
        <ThemeProvider value={DarkTheme}>
          <QueryClientProvider client={queryClient}>
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
              </Stack>
            </MySafeAreaView>
          </QueryClientProvider>
        </ThemeProvider>
      </Suspense>
    </TamaguiProvider>
  );
}
