import { ListItem, YGroup } from "tamagui";

import { formatNumber } from "../utils/utils";

const PostStats = (props) => {
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

export default PostStats;
