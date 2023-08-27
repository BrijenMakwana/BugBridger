import { ExternalLink } from "@tamagui/lucide-icons";
import * as Linking from "expo-linking";
import { Button } from "tamagui";

const ExternalButton = (props) => {
  const { link, type } = props;

  const openInStackOverflow = () => {
    Linking.openURL(link);
  };
  return (
    <Button
      iconAfter={ExternalLink}
      theme="green"
      marginTop={10}
      onPress={openInStackOverflow}
    >
      {`See this ${type} on StackOverflow`}
    </Button>
  );
};

export default ExternalButton;
