import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Registration } from "../screens";

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Registration" component={Registration} />
  </Stack.Navigator>
);
