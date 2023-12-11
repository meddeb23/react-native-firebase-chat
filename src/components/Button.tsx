import React from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  Text,
} from "react-native";

export interface ButtonProps {
  bg?: string;
  buttonText?: string;
  onPress: () => void;
  Icon?: React.ReactNode;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  buttonText,
  onPress,
  bg,
  Icon,
  active = true,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderColor: "white",
          paddingVertical: 12,
          paddingHorizontal: 12,
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderWidth: 1,
        },
        {
          backgroundColor: bg,
          opacity: active ? 1 : 0.6,
        },
        style,
      ]}
    >
      <Text
        style={[
          { fontSize: 16, textAlign: "center", color: "white" },
          textStyle,
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};
