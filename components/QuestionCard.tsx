import { Check, Eye, ThumbsUp } from "@tamagui/lucide-icons";
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
  const { username } = props;
  return (
    <XStack
      alignItems="center"
      gap={10}
    >
      <Avatar
        circular
        size="$2"
      >
        <Avatar.Image src="http://placekitten.com/200/300" />
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
        asked on 27 Jun, 2023
      </Text>
    </XStack>
  );
};

const QuestionCard = (props) => {
  const { question, tags, voteCount, answerCount, viewCount, username } = props;
  return (
    <Card
      padding={20}
      gap={12}
      animation="bouncy"
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875, backgroundColor: "$green10Dark" }}
    >
      <Card.Header padding={0}>
        <H5>{question}</H5>
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

      <Card.Footer alignSelf="flex-end">
        <User username={username} />
      </Card.Footer>
      <Card.Background />
    </Card>
  );
};

export default QuestionCard;
