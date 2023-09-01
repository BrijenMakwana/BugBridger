import { Link } from "expo-router";
import { decode } from "html-entities";
import { Card, H6 } from "tamagui";

import VoteCount from "./VoteCount";

const RelatedQuestion = (props) => {
  const { question_id, up_vote_count, title, is_answered } = props;

  return (
    <Link
      href={`/question/${question_id}`}
      asChild
    >
      <Card
        padding={10}
        marginVertical={7}
        animation="quick"
        pressStyle={{ scale: 0.95, backgroundColor: "$backgroundHover" }}
        enterStyle={{
          scale: 0.5,
          opacity: 0
        }}
        backgroundColor="$backgroundTransparent"
      >
        <Card.Header
          padding={0}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <VoteCount
            isAccepted={is_answered}
            vote={up_vote_count}
          />

          <H6
            flex={1}
            marginLeft={25}
          >
            {decode(title)}
          </H6>
        </Card.Header>
      </Card>
    </Link>
  );
};

export default RelatedQuestion;
