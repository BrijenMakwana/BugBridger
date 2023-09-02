import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import { darkColors } from "@tamagui/themes";
import { decode } from "html-entities";

const CustomMarkdown = ({ children }) => {
  return <Markdown style={styles}>{decode(children)}</Markdown>;
};

export default CustomMarkdown;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 16
  },
  code_inline: {
    fontSize: 15,
    color: "#000",
    backgroundColor: "#fff"
  },
  code_block: {
    fontSize: 15,
    color: "#000",
    backgroundColor: "#fff",
    marginVertical: 15,
    padding: 15,
    borderWidth: 3,
    borderColor: darkColors.green10
  }
});
