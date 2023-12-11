import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack, UserStack } from "./src/navigations";
import { useAuth } from "./src/hooks/useAuth";

export default function App() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {user ? <UserStack /> : <AuthStack />}
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
