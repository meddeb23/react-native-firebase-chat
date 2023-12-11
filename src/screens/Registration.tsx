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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../config/firebase.config";
interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export const Registration: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleRegistration = async () => {
    if (!email.length || !pwd.length) return;
    try {
      setIsLoading(true);
      const res = await createUserWithEmailAndPassword(Auth, email, pwd);
      console.log(
        "🚀 ~ file: Registration.tsx:26 ~ handleRegistration ~ res:",
        res
      );
    } catch (err) {
      console.error(
        "🚀 ~ file: Registration.tsx:30 ~ handleRegistration ~ err:",
        err
      );
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
          <Text style={sytles.title}>Create your account</Text>
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
                  buttonText="create account"
                  bg="white"
                  style={{ flex: 1 }}
                  onPress={handleRegistration}
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
                <Text>Have an account </Text>
                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                  <Text
                    style={{ textDecorationLine: "underline", color: "#fff" }}
                  >
                    login now
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
