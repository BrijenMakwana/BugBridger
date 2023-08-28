import { ExternalLink } from "@tamagui/lucide-icons";
import * as Linking from "expo-linking";
import { Button } from "tamagui";

const ExternalButton = (props) => {
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
