import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import { decode } from "html-entities";

const CustomMarkdown = ({ children }) => {
  return <Markdown style={styles}>{decode(children)}</Markdown>;
};

export default CustomMarkdown;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 16
  }
});
