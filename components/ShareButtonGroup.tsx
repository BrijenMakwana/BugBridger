import { Image, Share } from "react-native";
import { Share2 } from "@tamagui/lucide-icons";
import { openURL } from "expo-linking";
import { Button, Separator, XGroup } from "tamagui";

interface IShareButtonGroup {
  link: string;
}

const ShareButton = (props: IShareButtonGroup) => {
  const { link } = props;

  const shareLink = async () => {
    try {
      await Share.share({
        message: link
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <XGroup.Item>
      <Button
        onPress={shareLink}
        icon={Share2}
        scaleIcon={1.2}
      />
    </XGroup.Item>
  );
};

const ExternalButton = (props: IShareButtonGroup) => {
  const { link } = props;

  const openInStackOverflow = () => {
    openURL(link);
  };

  return (
    <XGroup.Item>
      <Button onPress={openInStackOverflow}>
        <Image
          source={require("../assets/images/stack-overflow.png")}
          style={{
            width: 25,
            aspectRatio: 1,
            resizeMode: "contain"
          }}
        />
      </Button>
    </XGroup.Item>
  );
};

const ShareButtonGroup = (props: IShareButtonGroup) => {
  const { link } = props;

  return (
    <XGroup
      bordered
      separator={<Separator vertical />}
    >
      <ShareButton link={link} />

      <ExternalButton link={link} />
    </XGroup>
  );
};

export default ShareButtonGroup;
