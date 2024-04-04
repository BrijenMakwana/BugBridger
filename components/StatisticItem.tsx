import { ListItem, XGroup } from "tamagui";

import { formatNumber } from "../utils/utils";

interface IStatisticItem {
  title: string;
  count: number;
}

const StatisticItem = (props: IStatisticItem) => {
  const { title, count } = props;

  return (
    <XGroup.Item>
      <ListItem
        size="$4"
        title={formatNumber(count)}
        subTitle={title}
        backgroundColor="$backgroundTransparent"
        flex={1}
      />
    </XGroup.Item>
  );
};

export default StatisticItem;
