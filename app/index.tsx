import { useRouter } from "expo-router";

import { MyStack } from "../components/MyStack";

export default function Home() {
  const router = useRouter();

  return <MyStack></MyStack>;
}
