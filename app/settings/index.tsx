import { useState } from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { openURL } from "expo-linking";
import { ListItem, Separator, XStack, YGroup, YStack } from "tamagui";

import GithubCard from "../../components/GithubCard";
import GoBack from "../../components/GoBack";
import { MyScroll } from "../../components/MyScroll";
import SiteInfoSheet from "../../components/SiteInfoSheet";
import TabHeading from "../../components/TabHeading";

const SettingsScreen = () => {
  const [siteInfoSheetIsOpen, setSiteInfoSheetIsOpen] = useState(false);

  return (
    <MyScroll>
      <YStack
        gap={15}
        marginHorizontal={15}
      >
        <XStack
          alignItems="center"
          gap={10}
        >
          <GoBack />
          <TabHeading>settings</TabHeading>
        </XStack>

        <YGroup
          bordered
          separator={<Separator />}
        >
          <YGroup.Item>
            <ListItem
              title="Powered by Stack Exchange API"
              subTitle="v2.3"
              icon={
                <MaterialCommunityIcons
                  name="api"
                  size={24}
                  color="#fff"
                />
              }
              pressTheme
              onPress={() => openURL("https://api.stackexchange.com")}
            />
          </YGroup.Item>

          <YGroup.Item>
            <ListItem
              title="Source Code"
              subTitle="Bug Bridger is an open-source project"
              icon={
                <MaterialCommunityIcons
                  name="github"
                  size={24}
                  color="#fff"
                />
              }
              pressTheme
              onPress={() =>
                openURL("https://github.com/BrijenMakwana/BugBridger")
              }
            />
          </YGroup.Item>

          <YGroup.Item>
            <ListItem
              title="Stack Overflow Stats"
              icon={
                <MaterialCommunityIcons
                  name="stack-overflow"
                  size={24}
                  color="#fff"
                />
              }
              pressTheme
              onPress={() => setSiteInfoSheetIsOpen(true)}
            />
            {siteInfoSheetIsOpen && (
              <SiteInfoSheet
                open={siteInfoSheetIsOpen}
                setOpen={setSiteInfoSheetIsOpen}
              />
            )}
          </YGroup.Item>

          <YGroup.Item>
            <ListItem
              title="Privacy Policy"
              icon={
                <MaterialIcons
                  name="policy"
                  size={24}
                  color="#fff"
                />
              }
              pressTheme
            />
          </YGroup.Item>

          <YGroup.Item>
            <ListItem
              title="Terms and Conditions"
              icon={
                <FontAwesome
                  name="legal"
                  size={21}
                  color="#fff"
                />
              }
              pressTheme
            />
          </YGroup.Item>
        </YGroup>

        <GithubCard />
      </YStack>
    </MyScroll>
  );
};

export default SettingsScreen;
