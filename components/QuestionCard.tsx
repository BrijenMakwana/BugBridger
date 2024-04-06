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

import { IAnswer } from "./Answers";
import { IComment } from "./CommentCard";
import PostCreationInfo, { IOwner, POST_TYPE } from "./PostCreationInfo";
import { IPostNotice } from "./PostNotice";
import StatisticItem from "./StatisticItem";
import Tag from "./Tag";

export interface IQuestion {
  question_id: number;
  title: string;
  is_answered: boolean;
  body_markdown: string;
  tags: string[];
  score: number;
  view_count: number;
  answer_count: number;
  owner: IOwner;
  creation_date: Date;
  link: string;
  notice: IPostNotice;
  answers: IAnswer[];
  comments: IComment[];
}

interface IQuestionCard extends IQuestion {
  isBody?: boolean;
}

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

        <Card.Footer>
          <PostCreationInfo
            type={POST_TYPE.QUESTION}
            creationDate={creation_date}
            {...owner}
          />
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default QuestionCard;
