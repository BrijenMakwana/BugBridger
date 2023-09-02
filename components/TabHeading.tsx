import { H2 } from "tamagui";

const TabHeading = (props) => {
  const { children } = props;

  return (
    <H2
      color="$green10Dark"
      textTransform="capitalize"
      marginVertical={10}
      marginLeft={5}
    >
      {children}
    </H2>
  );
};

export default TabHeading;
