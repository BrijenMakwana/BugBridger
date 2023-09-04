import { FC } from "react";
import { H2 } from "tamagui";

interface ITabHeading {
  children: string;
}

const TabHeading: FC<ITabHeading> = (props) => {
  const { children } = props;

  return (
    <H2
      color="$green10Dark"
      textTransform="capitalize"
      marginLeft={5}
    >
      {children}
    </H2>
  );
};

export default TabHeading;
