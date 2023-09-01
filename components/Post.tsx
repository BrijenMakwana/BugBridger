import { Check, Eye, TrendingUp, Verified } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { decode } from "html-entities";
import { Card, H5, Separator, Text, XStack, YGroup } from "tamagui";

import ExternalButton from "./ExternalButton";
import PostCreationInfo from "./PostCreationInfo";
import PostStats from "./PostStats";
import Tag from "./Tag";

const IsAnswered = () => {
  return (
    <XStack
      alignItems="center"
      marginBottom={10}
    >
      <Verified
        color="$green10Dark"
        size="$3"
      />
      <Text
        fontSize="$5"
        fontWeight="bold"
        color="$green10Dark"
        marginLeft={10}
      >
        Answered
      </Text>
    </XStack>
  );
};

const Post = (props) => {
  const {
    question_id,
    title,
    is_answered,
    body_markdown,
    tags,
    score,
    view_count,
    answer_count,
    owner,
    creation_date,
    link,
    isBody = false,
    isExternal = false,
    article_id,
    type
  } = props;

  return (
    <Link
      href={
        type === "question"
          ? `/question/${question_id}`
          : `/article/${article_id}`
      }
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
          {is_answered && <IsAnswered />}
          <H5>{decode(title)}</H5>

          {isBody && (
            <Text
              numberOfLines={5}
              fontSize="$4"
              color="$gray11Dark"
              marginTop={20}
            >
              {decode(body_markdown)}
            </Text>
          )}
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

          {type === "question" && (
            <PostStats
              title="Answers"
              icon={Check}
              count={answer_count}
            />
          )}

          <PostStats
            title="Votes"
            icon={TrendingUp}
            count={score}
          />
        </YGroup>

        <Card.Footer>
          <PostCreationInfo
            type="question"
            creationDate={creation_date}
            {...owner}
          />
        </Card.Footer>

        {isExternal && <ExternalButton link={link} />}
      </Card>
    </Link>
  );
};

export default Post;
