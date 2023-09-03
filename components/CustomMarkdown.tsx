import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import { darkColors } from "@tamagui/themes";
import { decode } from "html-entities";

const CustomMarkdown = ({ children }) => {
  return <Markdown style={styles}>{decode(children)}</Markdown>;
};

export default CustomMarkdown;

const styles = StyleSheet.create({
  body: {
    color: "#fff",
    fontSize: 16
  },
  blockquote: {
    fontSize: 15,
    color: "#000",
    backgroundColor: "#fff",
    marginVertical: 15,
    padding: 15
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
    padding: 15
  }
});
