import { Eye, TrendingUp } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { decode } from "html-entities";
import { Card, H5, Separator, XStack, YGroup } from "tamagui";

import ExternalButton from "./ExternalButton";
import PostCreationInfo from "./PostCreationInfo";
import PostStats from "./PostStats";
import Tag from "./Tag";

const ArticleCard = (props) => {
  const {
    article_id,
    title,
    tags,
    score,
    view_count,
    owner,
    creation_date,
    link,
    isExternal = false
  } = props;

  return (
    <Link
      href={`/article/${article_id}`}
      asChild
    >
      <Card
        padding={20}
        gap={13}
        marginHorizontal={5}
        marginVertical={10}
        animation="quick"
        pressStyle={{ scale: 0.95, backgroundColor: "$green10Dark" }}
        enterStyle={{
          scale: 0.5,
          opacity: 0
        }}
      >
        <Card.Header padding={0}>
          <H5>{decode(title)}</H5>
        </Card.Header>

        <XStack
          flexWrap="wrap"
          gap={8}
        >
          {tags?.map((item, index) => <Tag key={index}>{item}</Tag>)}
        </XStack>

        <YGroup
          bordered
          separator={<Separator />}
          marginTop={10}
        >
          <PostStats
            title="Views"
            icon={Eye}
            count={view_count}
          />

          <PostStats
            title="Votes"
            icon={TrendingUp}
            count={score}
          />
        </YGroup>

        <Card.Footer>
          <PostCreationInfo
            type="article"
            creationDate={creation_date}
            {...owner}
          />
        </Card.Footer>

        {isExternal && <ExternalButton link={link} />}
      </Card>
    </Link>
  );
};

export default ArticleCard;
