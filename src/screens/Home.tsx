import React, { useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Button, HStack, VStack } from "../components";
import { collection, getDocs } from "firebase/firestore";
import { FireStore } from "../config/firebase.config";
import { useAuth } from "../hooks/useAuth";
import { ActivityIndicator } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  profile_image: string;
};

export const Home: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [users, setUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    const users = await getDocs(collection(FireStore, "users"));
    const userState: User[] = [];
    users.forEach((doc) => {
      const user = { id: doc.id, ...doc.data() } as User;
      userState.push(user);
    });
    setUsers(userState.filter((u) => u.id !== user?.email));
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <VStack
      flex={1}
      style={{
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <FlatList
        style={{
          height: "100%",
        }}
        data={users.filter(
          (u) => u.id !== user?.email && u.email !== user?.email
        )}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 32, padding: 24, fontWeight: "bold" }}>
            User List
          </Text>
        )}
        contentContainerStyle={{
          height: "100%",
        }}
        ListEmptyComponent={() => (
          <VStack
            style={{ height: "100%" }}
            justifyContent="center"
            alignItems="center"
          >
            {isLoading ? (
              <ActivityIndicator size={32} />
            ) : (
              <Text>List is Empty</Text>
            )}
          </VStack>
        )}
        ItemSeparatorComponent={() => (
          <VStack alignItems="center">
            <View
              style={{
                width: "90%",
                height: 0.5,
                backgroundColor: "black",
                marginHorizontal: "auto",
              }}
            />
          </VStack>
        )}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push("Chat", { user: item });
              }}
            >
              <HStack alignItems="center">
                <Image
                  source={
                    item.profile_image
                      ? { uri: item.profile_image }
                      : require("../../assets/adaptive-icon.png")
                  }
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                />
                <VStack style={{ padding: 20 }}>
                  <Text style={{ fontSize: 20, textTransform: "capitalize" }}>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text>{item.phone_number}</Text>
                </VStack>
              </HStack>
            </TouchableOpacity>
          );
        }}
      />
    </VStack>
  );
};

const sytles = StyleSheet.create({});
