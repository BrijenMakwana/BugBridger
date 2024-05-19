import { RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { darkColors } from "@tamagui/themes";
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

  const { questions, isFetching, isError, error, refetch } =
    useTaggedQuestions(tag);

  if (isError)
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
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            colors={[darkColors.green11]}
            progressBackgroundColor={darkColors.gray5}
            onRefresh={refetch}
          />
        }
      />
    </MyStack>
  );
};

export default TagQuestions;
