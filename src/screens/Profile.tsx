import React, { useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button as RNButton,
  ActivityIndicator,
  Image,
} from "react-native";
import { HStack, VStack, Button } from "../components";
import { signOut } from "firebase/auth";
import { Auth, FireStore, Storage } from "../config/firebase.config";
import { useAuth } from "../hooks/useAuth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { imageToBlob, usePickImage } from "../helpers";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
interface Props {}

interface UserFormData {
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image: string | null;
}

export const Profile: React.FC<Props> = () => {
  const { imageUrl, pickImage, getImageUrl } = usePickImage();
  const { user } = useAuth();
  const [firstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [hasDoc, setHasDoc] = React.useState(false);
  const [userCurrentImage, setUserCurrentImage] = React.useState("");

  const updateOrCreateUser = async () => {
    if (user?.email) {
      setIsLoading(true);
      const userData: UserFormData = {
        first_name: firstName,
        last_name: LastName,
        phone_number: phoneNumber,
        profile_image: null,
      };
      if (imageUrl) {
        const file = await imageToBlob(imageUrl);
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        const storageRef = ref(Storage, filename);
        const res = await uploadBytes(storageRef, file);
        const url = await getImageUrl(filename);
        userData.profile_image = url;
      }
      if (hasDoc) {
        await updateDoc(doc(FireStore, "users", user.email), { ...userData });
      } else {
        await setDoc(doc(FireStore, "users", user.email), userData);
      }

      setIsLoading(false);
    }
  };
  const loadUserProfile = async () => {
    if (user?.email) {
      setIsLoadingData(true);
      const userProfile = await getDoc(doc(FireStore, "users", user.email));
      if (userProfile.exists()) {
        const current_user = userProfile.data();
        setFirstName(current_user.first_name);
        setLastName(current_user.last_name);
        setPhoneNumber(current_user.phone_number);
        setHasDoc(true);
        setUserCurrentImage(current_user.profile_image);
      }
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, [user]);
  return (
    <VStack justifyContent="center" alignItems="center" flex={1}>
      {isLoadingData ? (
        <ActivityIndicator size={32} color={"white"} />
      ) : (
        <VStack spacing={12} style={{ width: "80%" }}>
          <VStack spacing={12}>
            <HStack justifyContent="center">
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={
                    imageUrl
                      ? { uri: imageUrl }
                      : userCurrentImage
                      ? { uri: userCurrentImage }
                      : require("../../assets/adaptive-icon.png")
                  }
                  style={{ width: 200, height: 200, borderRadius: 30 }}
                />
              </TouchableOpacity>
            </HStack>
            <TextInput
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={sytles.textInput}
              placeholder="first name"
            />
            <TextInput
              value={LastName}
              onChangeText={(text) => setLastName(text)}
              style={sytles.textInput}
              placeholder="last name"
            />
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              style={sytles.textInput}
              placeholder="phone number"
            />
          </VStack>
          {isLoading ? (
            <ActivityIndicator size={32} color={"white"} />
          ) : (
            <>
              <HStack spacing={12}>
                <Button
                  buttonText="Update"
                  bg="white"
                  style={{ flex: 1 }}
                  onPress={updateOrCreateUser}
                  textStyle={{
                    color: "#5FBE9C",
                  }}
                />
                <Button
                  buttonText="Logout"
                  textStyle={{ color: "#5FBE9C" }}
                  style={{ flex: 1, borderColor: "#5FBE9C" }}
                  onPress={() => signOut(Auth)}
                />
              </HStack>
            </>
          )}
        </VStack>
      )}
    </VStack>
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
