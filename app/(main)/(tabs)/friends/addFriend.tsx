import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { gray } from "colorette";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function addFriendScreen() {
  const [text, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textBox}
          value={text}
          onChangeText={onChangeText}
          placeholder={"Enter username"}
        />
        <TouchableOpacity style={styles.button}>Add friend</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContainer: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  backButton: {},
  mainContainer: {},
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    right: 30,
    alignItems: "center",
  },
  textBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#999",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#0cf",
    padding: 12,
    color: "#fff",
    borderRadius: 4,
  },
});
