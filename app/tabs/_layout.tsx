import { Home, Search } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: darkColors.green10,
        tabBarInactiveTintColor: darkColors.gray11,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkColors.gray2
        },
        tabBarLabelStyle: {
          textTransform: "capitalize"
        }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Home
              size="$1.5"
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Ask Question",
          tabBarIcon: ({ color }) => (
            <Search
              size="$1.5"
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}
