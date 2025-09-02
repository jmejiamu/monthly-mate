import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

interface BaseButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
}

const BaseButton = (props: BaseButtonProps) => {
  const { onPress, title, buttonStyle, ...rest } = props;
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.addButton, buttonStyle]}
        {...rest}
      >
        <Text style={styles.addButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#22223B",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
