import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Chat, Home, Profile, Search } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BottomNav = createMaterialBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

const ChatStackGroup = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatStack.Screen name="Home" component={Home} />
      <ChatStack.Screen name="Chat" component={Chat} />
    </ChatStack.Navigator>
  );
};

export const UserStack = () => (
  <BottomNav.Navigator>
    <BottomNav.Screen name="HomeStack" component={ChatStackGroup} />
    <BottomNav.Screen name="search" component={Search} />
    <BottomNav.Screen name="profile" component={Profile} />
  </BottomNav.Navigator>
);
