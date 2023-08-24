import { Redirect, useRouter } from "expo-router";

import { MyStack } from "../components/MyStack";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const router = useRouter();

  return (
    <MyStack>
      <SearchBar />
    </MyStack>
  );
}
