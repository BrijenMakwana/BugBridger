import { Home, Newspaper, Search } from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";
import { Tabs } from "expo-router";
import { XStack } from "tamagui";

import SiteInfoButton from "../../components/SiteInfoButton";
import TabHeading from "../../components/TabHeading";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: darkColors.green10,
        tabBarInactiveTintColor: darkColors.gray11,
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
          ),
          header: () => (
            <XStack
              alignItems="center"
              justifyContent="space-between"
              paddingHorizontal={5}
            >
              <TabHeading>Featured Questions</TabHeading>

              <SiteInfoButton />
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
      <Tabs.Screen
        name="Articles"
        options={{
          title: "Articles",
          tabBarIcon: ({ color }) => (
            <Newspaper
              size="$1.5"
              color={color}
            />
          ),
          header: () => <TabHeading>Featured Articles</TabHeading>
        }}
      />
    </Tabs>
  );
}
