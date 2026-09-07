import {
  useFonts,
  Lora_400Regular,
  Lora_500Medium,
} from "@expo-google-fonts/lora";
import RootNavigator from "./src/navigation/RootNavigator";
export default function App() {
  const [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_500Medium,
  });
  if (!fontsLoaded) return null;
  return <RootNavigator />;
}
