import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Button, HStack, VStack } from "../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../config/firebase.config";

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = React.useState("hmid@example.com");
  const [pwd, setPwd] = React.useState("Password");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogin = async () => {
    if (!email.length || !pwd.length) return;
    try {
      setIsLoading(true);
      const res = await signInWithEmailAndPassword(Auth, email, pwd);
      console.log("🚀 ~ file: Login.tsx:26 ~ handleLogin ~ res:", res);
    } catch (err) {
      console.error("🚀 ~ file: Login.tsx:30 ~ handleLogin ~ err:", err);
    }
    setIsLoading(false);
  };
  return (
    <ImageBackground
      source={require("../../assets/bg-type-1_1.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <VStack flex={1} justifyContent="center" alignItems="center">
        <VStack style={{ width: "80%" }} justifyContent="center" spacing={32}>
          <Text style={sytles.title}>Welcome Back</Text>
          <VStack spacing={12}>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              style={sytles.textInput}
              placeholder="username"
            />
            <TextInput
              onChangeText={(text) => setPwd(text)}
              style={sytles.textInput}
              placeholder="password"
            />
          </VStack>
          {isLoading ? (
            <ActivityIndicator size={32} color={"white"} />
          ) : (
            <>
              <HStack spacing={12}>
                <Button
                  buttonText="Connect"
                  bg="white"
                  style={{ flex: 1 }}
                  onPress={handleLogin}
                  textStyle={{
                    color: "#5FBE9C",
                  }}
                />
                <Button
                  buttonText="Exit"
                  style={{ flex: 1 }}
                  onPress={() => console.log("Exit")}
                />
              </HStack>
              <HStack justifyContent="center">
                <Text>Don't have an account </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace("Registration")}
                >
                  <Text
                    style={{ textDecorationLine: "underline", color: "#fff" }}
                  >
                    create one now
                  </Text>
                </TouchableOpacity>
              </HStack>
            </>
          )}
        </VStack>
      </VStack>
    </ImageBackground>
  );
};

const sytles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 44,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#fff",
    color: "#000",
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
