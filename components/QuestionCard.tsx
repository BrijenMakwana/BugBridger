import { Check, Eye, ThumbsUp } from "@tamagui/lucide-icons";
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
    question,
    questionBody,
    tags,
    voteCount,
    answerCount,
    viewCount,
    username,
    userAvatar,
    creationDate
  } = props;
  return (
    <Card
      padding={20}
      alignSelf="center"
      gap={12}
      marginVertical={10}
      animation="bouncy"
      pressStyle={{ scale: 0.99, backgroundColor: "$green10Dark" }}
    >
      <Card.Header padding={0}>
        <H5>{question}</H5>
        <Text
          numberOfLines={5}
          fontSize="$4"
          color="$gray11Dark"
          marginTop={20}
        >
          {questionBody}
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
          title="Votes"
          icon={ThumbsUp}
          count={voteCount}
        />
        <CustomListItem
          title="Answers"
          icon={Check}
          count={answerCount}
        />
        <CustomListItem
          title="Views"
          icon={Eye}
          count={viewCount}
        />
      </YGroup>

      <Card.Footer>
        <User
          username={username}
          userAvatar={userAvatar}
          creation_date={creationDate}
        />
      </Card.Footer>
      <Card.Background />
    </Card>
  );
};

export default QuestionCard;
