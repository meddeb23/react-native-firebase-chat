import React from "react";
import { Dialog } from "react-native-paper";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HStack, VStack } from "../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "./Home";
import { Database } from "../config/firebase.config";
import { onValue, push, ref, set } from "firebase/database";
import { useAuth } from "../hooks/useAuth";
interface Props {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

export const Chat: React.FC<Props> = ({ route, navigation }) => {
  const { user } = useAuth();
  const { user: recieverUser }: { user: User } = route.params;
  const [message, setMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [isTypingTimeout, setIsTypingTimeout] = React.useState<
    NodeJS.Timeout | undefined
  >();
  const [messages, setMessages] = React.useState<any[] | null>(null);
  const key = React.useMemo(() => {
    console.log(user?.email, recieverUser.id);
    return [user?.email, recieverUser.id].sort().join("-").split(".").join("");
  }, [user, recieverUser]);

  async function sendMessage() {
    if (user && message.length !== 0) {
      const dbRef = ref(Database, `conversation/${key}/conversation/`);
      await push(dbRef, {
        email: user?.email,
        content: message,
      });
      setMessage("");
    }
  }
  async function setTyping(state: boolean) {
    const dbRef = ref(Database, `conversation/${key}/typing`);
    await set(dbRef, { state, user: user?.email });
  }
  React.useEffect(() => {
    const messagesRef = ref(Database, `conversation/${key}/conversation/`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      setMessages(Object.values(data));
    });

    const typingRef = ref(Database, `conversation/${key}/typing`);
    onValue(typingRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      if (data.user !== user?.email) setIsTyping(data.state);
      console.log(
        "🚀 ~ file: Chat.tsx:47 ~ onValue ~ typing:",
        data,
        data.user,
        user?.email,
        data.user !== user?.email
      );
    });
  }, [user]);

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  return (
    <>
      <VStack>
        <HStack
          style={{
            padding: 24,
            paddingTop: 24 + (StatusBar.currentHeight || 0),
            elevation: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <HStack alignItems="center" spacing={16}>
            <Image
              source={
                recieverUser.profile_image
                  ? { uri: recieverUser.profile_image }
                  : require("../../assets/adaptive-icon.png")
              }
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
              <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                {recieverUser.first_name} {recieverUser.last_name}
              </Text>
            </TouchableOpacity>
          </HStack>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "blue" }}>back</Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
      <VStack flex={1}>
        <Dialog
          dismissable
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <VStack
            justifyContent="center"
            alignItems="center"
            spacing={12}
            style={{ paddingBottom: 30 }}
          >
            <Image
              source={
                recieverUser.profile_image
                  ? { uri: recieverUser.profile_image }
                  : require("../../assets/adaptive-icon.png")
              }
              style={{ width: 80, height: 80, borderRadius: 30 }}
            />
            <VStack spacing={8}>
              <Text>first name: {recieverUser.first_name}</Text>
              <Text>last name: {recieverUser.last_name}</Text>
              <Text>phone number: {recieverUser.phone_number}</Text>
              <Text>email: {recieverUser.email}</Text>
            </VStack>
          </VStack>
        </Dialog>
        <FlatList
          style={{
            padding: 8,
          }}
          contentContainerStyle={{
            gap: 8,
          }}
          inverted={!!messages?.length || isTyping}
          ListEmptyComponent={() => (
            <VStack
              style={{ height: 300 }}
              justifyContent="center"
              alignItems="center"
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Say hay to {recieverUser.first_name} 👋
              </Text>
            </VStack>
          )}
          data={
            messages
              ? [{ type: "typing" }, ...messages]
              : isTyping
              ? [{ type: "typing" }]
              : []
          }
          renderItem={({ item }) => {
            const isMe = item.email === user?.email;
            const getBubbleStyle = isMe
              ? {
                  borderBottomRightRadius: 0,
                  backgroundColor: "tomato",
                }
              : { borderBottomLeftRadius: 0, backgroundColor: "blue" };
            if (item.type === "typing")
              return isTyping ? (
                <HStack
                  alignItems="center"
                  spacing={12}
                  justifyContent={"flex-start"}
                  style={{
                    flexDirection: "row-reverse",
                  }}
                >
                  <View
                    style={{
                      padding: 16,
                      borderRadius: 16,
                      alignSelf: "center",
                      maxWidth: "80%",
                      borderBottomRightRadius: 0,
                      backgroundColor: "tomato",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      typing...
                    </Text>
                  </View>
                </HStack>
              ) : (
                <></>
              );

            return (
              <HStack
                alignItems="center"
                spacing={12}
                justifyContent={"flex-start"}
                style={{
                  flexDirection: isMe ? "row-reverse" : "row",
                }}
              >
                {!isMe && (
                  <Image
                    source={
                      recieverUser.profile_image
                        ? { uri: recieverUser.profile_image }
                        : require("../../assets/adaptive-icon.png")
                    }
                    resizeMode="cover"
                    style={{
                      width: 39,
                      height: 39,
                      borderRadius: 100,
                    }}
                  />
                )}
                <View
                  style={[
                    {
                      padding: 16,
                      borderRadius: 16,
                      alignSelf: "center",
                      maxWidth: "80%",
                    },
                    getBubbleStyle,
                  ]}
                >
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    {item.content}
                  </Text>
                </View>
              </HStack>
            );
          }}
        />
        <HStack justifyContent="space-between" alignItems="center">
          <TextInput
            placeholder="Type your message"
            onChangeText={(text) => {
              if (isTypingTimeout) {
                clearTimeout(isTypingTimeout);
              }
              setMessage(text);
              setTyping(true);
              setIsTypingTimeout(
                setTimeout(() => {
                  setTyping(false);
                }, 1000)
              );
            }}
            value={message}
            style={{
              padding: 16,
              flex: 1,
            }}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: "blue",
            }}
          >
            <Text
              style={{
                padding: 16,
                color: "#fff",
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </>
  );
};
