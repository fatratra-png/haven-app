import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screen/WelcomeScreen";
import HomeScreen from "../screen/HomeScreen";
import TimeSelectScreen from "../screen/TimeSelectScreen";
import ActiveSessionScreen from "../screen/ActiveSessionScreen";
import SessionCompleteScreen from "../screen/SessionCompleteScreen";
import SettingScreen from "../screen/SettingScreen";
import SoundSelectScreen from "../screen/SoundSelectScreen";
import MoodLogScreen from "../screen/MoodLogScreen";
import JournalScreen from "../screen/JournalScreen";

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  TimerSelect: { activity: string };
  ActiveSession: { activity: string; minutes: number };
  SessionComplete: { activity: string; minutes: number };
  Settings: undefined;
  SoundSelect: undefined;
  MoodLog: undefined;
  Journal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TimerSelect" component={TimeSelectScreen} />
        <Stack.Screen name="ActiveSession" component={ActiveSessionScreen} />
        <Stack.Screen
          name="SessionComplete"
          component={SessionCompleteScreen}
        />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="SoundSelect" component={SoundSelectScreen} />
        <Stack.Screen name="MoodLog" component={MoodLogScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}