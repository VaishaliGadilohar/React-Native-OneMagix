import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../hooks/useTheme";

const CustomText = (props: TextProps) => {
  const { theme } = useTheme();
  return <Text style={[{ color: theme.text }, props.style]} {...props} />;
};

export default CustomText;
