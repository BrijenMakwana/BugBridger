import { Home, Search, Settings } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import { Link, Tabs } from "expo-router";
import { Button, XStack } from "tamagui";

import TabHeading from "@/components/TabHeading";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: darkColors.green10,
        tabBarInactiveTintColor: darkColors.gray11,
        tabBarStyle: {
          backgroundColor: darkColors.gray2,
          height: 60,
          paddingBottom: 10
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
          ),
          header: () => (
            <XStack
              alignItems="center"
              justifyContent="space-between"
              paddingHorizontal={5}
              backgroundColor="$backgroundStrong"
            >
              <TabHeading>Featured</TabHeading>

              <Link
                href="/settings"
                asChild
              >
                <Button icon={Settings} />
              </Link>
            </XStack>
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
          ),
          header: () => <TabHeading>ask question</TabHeading>
        }}
      />
    </Tabs>
  );
}
