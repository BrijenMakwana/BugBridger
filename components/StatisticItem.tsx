import { ListItem, XGroup } from "tamagui";

import { formatNumber } from "../utils/utils";

interface IStatisticItemWithSubTitle {
  title: number;
  subTitle: string;
}

interface IStatisticItemWithIcon {
  title: number;
  icon: React.ReactNode;
}

const StatisticItem = (
  props: IStatisticItemWithSubTitle | IStatisticItemWithIcon
) => {
  const { title } = props;

  return (
    <XGroup.Item>
      <ListItem
        size="$4"
        title={formatNumber(title)}
        subTitle={"subTitle" in props ? props.subTitle : null}
        backgroundColor="$backgroundTransparent"
        flex={1}
        icon={"icon" in props ? props.icon : null}
        scaleIcon={1.3}
      />
    </XGroup.Item>
  );
};

export default StatisticItem;
