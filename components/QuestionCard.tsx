import { Check, Eye, TrendingUp, Verified } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { decode } from "html-entities";
import moment from "moment";
import {
  Avatar,
  Card,
  H5,
  ListItem,
  Separator,
  Text,
  XStack,
  YGroup
} from "tamagui";

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

const CustomListItem = (props) => {
  const { title, icon, count } = props;
  return (
    <YGroup.Item>
      <ListItem
        hoverTheme
        icon={icon}
        size="$4"
        title={count}
        subTitle={title}
        backgroundColor="$backgroundTransparent"
      />
    </YGroup.Item>
  );
};

const User = (props) => {
  const { username, userAvatar, creationDate } = props;
  return (
    <XStack
      alignItems="center"
      justifyContent="flex-end"
      gap={10}
      flex={1}
      flexWrap="wrap"
    >
      <Avatar
        circular
        size="$2"
      >
        <Avatar.Image src={userAvatar} />
        <Avatar.Fallback bc="$green10Dark" />
      </Avatar>

      <Text
        fontSize="$3"
        color="$green10Dark"
        fontWeight="500"
      >
        {username}
      </Text>

      <Text
        fontSize="$2"
        color="$gray11Dark"
        fontWeight="500"
      >
        asked on {moment(creationDate).format("ll")}
      </Text>
    </XStack>
  );
};

const QuestionCard = (props) => {
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
    creation_date
  } = props;
  return (
    <Link
      href={`/question/${question_id}`}
      asChild
    >
      <Card
        padding={20}
        width="98%"
        alignSelf="center"
        gap={12}
        marginVertical={10}
        animation="bouncy"
        pressStyle={{ scale: 0.95, backgroundColor: "$green10Dark" }}
        enterStyle={{
          scale: 0.5,
          opacity: 0
        }}
      >
        <Card.Header padding={0}>
          {is_answered && <IsAnswered />}
          <H5>{decode(title)}</H5>

          <Text
            numberOfLines={5}
            fontSize="$4"
            color="$gray11Dark"
            marginTop={20}
          >
            {decode(body_markdown)}
          </Text>
        </Card.Header>

        <XStack
          flexWrap="wrap"
          gap={8}
        >
          {tags?.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        </XStack>

        <YGroup
          bordered
          separator={<Separator />}
          marginTop={10}
        >
          <CustomListItem
            title="Views"
            icon={Eye}
            count={view_count}
          />
          <CustomListItem
            title="Answers"
            icon={Check}
            count={answer_count}
          />
          <CustomListItem
            title="Votes"
            icon={TrendingUp}
            count={score}
          />
        </YGroup>

        <Card.Footer>
          <User
            username={owner?.display_name}
            userAvatar={owner?.profile_image}
            creation_date={creation_date}
          />
        </Card.Footer>
        <Card.Background></Card.Background>
      </Card>
    </Link>
  );
};

export default QuestionCard;
