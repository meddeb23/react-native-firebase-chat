import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Button, HStack, VStack } from "../components";
interface Props {}

export const Search: React.FC<Props> = () => {
  return (
    <VStack justifyContent="center" alignItems="center" flex={1}>
      <Text>Search screen</Text>
    </VStack>
  );
};

const sytles = StyleSheet.create({});
