import React from "react";
import { View, StyleSheet, ViewProps, FlexAlignType } from "react-native";

interface Props extends ViewProps {
  spacing?: number;
  direction: "row" | "column";
  children: React.ReactNode;
  flex?: number;
  w?: string | number | undefined;
  justifyContent:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  alignItems: FlexAlignType | undefined;
}
interface StackProps extends ViewProps {
  spacing?: number;
  children: React.ReactNode;
  flex?: number;
  w?: string | number | undefined;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  alignItems?: FlexAlignType | undefined;
}

export const FlexBox: React.FC<Props> = ({
  spacing,
  direction,
  justifyContent,
  alignItems,
  children,
  style,
  flex,
  w,
}) => {
  const ViewStyle = StyleSheet.flatten([
    {
      gap: spacing,
      flexDirection: direction,
      justifyContent,
      alignItems,
      flex: flex,
      width: w,
    },
    style,
  ]);
  return <View style={ViewStyle}>{children}</View>;
};
export const VStack: React.FC<StackProps> = ({
  spacing,
  children,
  justifyContent,
  alignItems,
  style,
  flex,
  w,
}) => {
  return (
    <FlexBox
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flex={flex}
      w={w}
      direction="column"
      style={style}
    >
      {children}
    </FlexBox>
  );
};
export const HStack: React.FC<StackProps> = ({
  spacing,
  children,
  justifyContent,
  alignItems,
  style,
  flex,
  w,
}) => {
  return (
    <FlexBox
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flex={flex}
      w={w}
      direction="row"
      style={style}
    >
      {children}
    </FlexBox>
  );
};
