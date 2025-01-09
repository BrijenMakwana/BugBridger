import { FlashList } from "@shopify/flash-list";
import { Spinner } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { XStack } from "tamagui";
import { H3 } from "tamagui";

import Error from "@/components/Error";
import GoBack from "@/components/GoBack";
import { MyStack } from "@/components/MyStack";
import QuestionCard from "@/components/QuestionCard";
import useTaggedQuestions from "@/hooks/useTaggedQuestions";

const TagQuestions = () => {
  const { tag } = useLocalSearchParams();

  const { questions, isPending, error, refetch } = useTaggedQuestions(tag);

  if (error)
    return (
      <Error
        error={error}
        refetch={refetch}
      />
    );

  return (
    <MyStack gap={10}>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        marginTop={5}
        paddingHorizontal={10}
      >
        <GoBack />

        <H3>{tag}</H3>
      </XStack>

      {isPending && (
        <Spinner
          size="large"
          color="$green10Dark"
        />
      )}
      <FlashList
        data={questions}
        renderItem={({ item }) => (
          <QuestionCard
            {...item}
            isBody
          />
        )}
        estimatedItemSize={5}
        contentContainerStyle={{
          paddingHorizontal: 10
        }}
      />
    </MyStack>
  );
};

export default TagQuestions;
