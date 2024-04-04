import { H2 } from "tamagui";

interface ITabHeading {
  children: string;
}

const TabHeading = (props: ITabHeading) => {
  const { children } = props;

  return (
    <H2
      color="$green10Dark"
      textTransform="capitalize"
      marginLeft={5}
      backgroundColor="$backgroundStrong"
    >
      {children}
    </H2>
  );
};

export default TabHeading;
