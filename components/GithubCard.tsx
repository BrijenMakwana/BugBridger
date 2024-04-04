import { FontAwesome } from "@expo/vector-icons";
import { ExternalLink } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { openURL } from "expo-linking";
import { Avatar, Button, Card, H2, H5, Paragraph, XStack } from "tamagui";

import Tag from "./Tag";

const GithubCard = () => {
  const getGitRepo = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/repos/BrijenMakwana/BugBridger"
      );

      return response.data;
    } catch (error) {
      return error;
    }
  };

  const getContributors = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/repos/BrijenMakwana/BugBridger/contributors"
      );

      return response.data;
    } catch (error) {
      return error;
    }
  };

  const { data: gitRepo, error: repoError } = useQuery({
    queryKey: ["gitRepoData"],
    queryFn: getGitRepo
  });

  const { data: contributors, error: contributorsError } = useQuery({
    queryKey: ["contributorsData"],
    queryFn: getContributors
  });

  if (repoError || contributorsError) return;

  return (
    <Card
      padding={15}
      gap={13}
    >
      <Card.Header padding={0}>
        <XStack
          alignItems="center"
          gap={15}
        >
          <FontAwesome
            name="github"
            size={35}
            color="#fff"
          />
          <H2>{gitRepo?.name}</H2>
        </XStack>
      </Card.Header>
      <Paragraph theme="alt1">{gitRepo?.description}</Paragraph>

      <XStack
        flexWrap="wrap"
        gap={8}
      >
        {gitRepo?.topics?.map((item: string, index: number) => (
          <Tag key={index}>{item}</Tag>
        ))}
      </XStack>

      <H5 textTransform="capitalize">contributors</H5>

      <XStack
        flexWrap="wrap"
        gap={8}
      >
        {contributors?.map((item) => (
          <Avatar
            circular
            size="$4"
            key={item.id}
            onPress={() => openURL(item?.html_url)}
          >
            <Avatar.Image src={item?.avatar_url} />
            <Avatar.Fallback bc="$green10" />
          </Avatar>
        ))}
      </XStack>
      <Card.Footer alignSelf="flex-end">
        <Button
          onPress={() => openURL(gitRepo?.html_url)}
          iconAfter={ExternalLink}
        >
          Contribute
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default GithubCard;
