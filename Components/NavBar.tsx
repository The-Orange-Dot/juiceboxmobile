import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NavBar = () => {
  return (
    <View style={styles.container}>
      <Text>NavBar</Text>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
  },
});
