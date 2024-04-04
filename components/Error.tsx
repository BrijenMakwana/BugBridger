import { Image } from "react-native";

const Error = () => {
  return (
    <Image
      source={require("../assets/images/error.svg")}
      style={{
        width: "100%",
        aspectRatio: 1
      }}
      resizeMode="contain"
    />
  );
};

export default Error;
