import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import { Storage } from "../config/firebase.config";

export const usePickImage = () => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  // No permissions request is necessary for launching the image library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const getImageUrl = async (filePath: string) => {
    const storageRef = ref(Storage, filePath);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  return { imageUrl, pickImage, getImageUrl };
};

export const imageToBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = response.blob();
  return blob;
};
