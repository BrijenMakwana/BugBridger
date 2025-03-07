import {
  Eye,
  MessagesSquare,
  TrendingUp,
  Verified
} from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { decode } from "html-entities";
import { Card, H5, Paragraph, Separator, Text, XStack } from "tamagui";
import { XGroup } from "tamagui";
import PostCreationInfo from "./PostCreationInfo";
import StatisticItem from "./StatisticItem";
import Tag from "./Tag";
import { IQuestion } from "@/types";

interface IQuestionCard extends IQuestion {
  isBody?: boolean;
}

const IsAnswered = () => {
  return (
    <XStack
      alignItems="center"
      gap={10}
      marginBottom={10}
    >
      <Verified
        color="$green10Dark"
        size="$2"
      />
      <Text
        fontSize="$4"
        fontWeight="bold"
        color="$green10Dark"
      >
        Answered
      </Text>
    </XStack>
  );
};

const QuestionCard = (props: IQuestionCard) => {
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
    isBody = false
  } = props;

  return (
    <Link
      href={`/question/${question_id}`}
      asChild
    >
      <Card
        padding={15}
        gap={13}
        marginVertical={10}
        pressTheme
      >
        <Card.Header padding={0}>
          {is_answered && <IsAnswered />}

          <H5>{decode(title)}</H5>
        </Card.Header>

        {isBody && (
          <Paragraph
            theme="alt1"
            numberOfLines={5}
          >
            {decode(body_markdown)}
          </Paragraph>
        )}

        <XStack
          flexWrap="wrap"
          gap={8}
        >
          {tags?.map((item, index) => <Tag key={index}>{item}</Tag>)}
        </XStack>

        <XGroup
          bordered
          separator={<Separator vertical />}
          marginTop={10}
        >
          <StatisticItem
            title={view_count}
            icon={<Eye />}
          />

          <StatisticItem
            title={answer_count}
            icon={<MessagesSquare />}
          />

          <StatisticItem
            title={score}
            icon={<TrendingUp />}
          />
        </XGroup>

        <Card.Footer justifyContent="flex-end">
          <PostCreationInfo
            creationDate={creation_date}
            {...owner}
          />
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default QuestionCard;
