import { FC } from "react";
import { ExternalLink } from "@tamagui/lucide-icons";
import * as Linking from "expo-linking";
import { Button } from "tamagui";

interface IExternalButton {
  link: string;
}

const ExternalButton: FC<IExternalButton> = (props) => {
  const { link } = props;

  const openInStackOverflow = () => {
    Linking.openURL(link);
  };

  return (
    <Button
      iconAfter={ExternalLink}
      onPress={openInStackOverflow}
      variant="outlined"
      color="$green10Dark"
    >
      View on StackOverflow
    </Button>
  );
};

export default ExternalButton;
