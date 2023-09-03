import { FC, NamedExoticComponent } from "react";
import { ListItem, YGroup } from "tamagui";

import { formatNumber } from "../utils/utils";

interface IPostStat {
  title: string;
  icon: NamedExoticComponent<IconProps>;
  count: number;
}

const PostStat: FC<IPostStat> = (props) => {
  const { title, icon, count } = props;

  return (
    <YGroup.Item>
      <ListItem
        hoverTheme
        icon={icon}
        size="$4"
        title={formatNumber(count)}
        subTitle={title}
        backgroundColor="$backgroundTransparent"
      />
    </YGroup.Item>
  );
};

export default PostStat;
