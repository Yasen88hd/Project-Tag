import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScaledSize,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  const [code, setCode] = useState("");

  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const handleResize = (dims: { window: ScaledSize; screen: ScaledSize }) => {
      setScreenWidth(dims.window.width);
      setScreenHeight(dims.window.height);
    };
    const subscription = Dimensions.addEventListener("change", handleResize);
    return () => {
      subscription?.remove();
    };
  }, []);

  const handleCreateGame = () => {
    fetch("http://localhost:5000/api/create-game", {
      method: "POST",
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        }
      })
      .then((data) => {
        //get game code
        console.log(data);
        let code: string = data as string;

        //store code somewhere

        router.push("/play/CreateGameScreen");
      });
  };

  const handleJoinGame = () => {
    router.navigate("/play/JoinGameScreen");
  };

  function handleCodeChanged(text: string) {
    setCode(text.toUpperCase());
  }

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background}>
        <Image
          source={require("../../../../assets/images/bikers.png")}
          style={styles.backgroundImage}
        />
      </View>

      {/* Main Menu */}
      <View style={styles.mainMenu}>
        <View style={styles.text}>
          <Text style={styles.title}>Project Tag</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleCreateGame}>
            <Text style={styles.buttonText}>Create Game</Text>
          </TouchableOpacity>
          <View style={styles.joinContainer}>
            <TextInput
              style={styles.textBox}
              value={code}
              onChangeText={handleCodeChanged}
              placeholder={"Enter code"}
              maxLength={4}
            />

            <TouchableOpacity
              style={[styles.button, styles.joinButton]}
              onPress={handleJoinGame}
            >
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mainMenu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontFamily: "cursive",
  },
  buttons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgb(21, 66, 117)",
    borderRadius: 5,
    width: 200,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 21,
    textAlign: "center",
    color: "rgb(21, 66, 117)",
    fontFamily: "cursive",
    fontWeight: "bold",
  },
  joinContainer: {
    flexDirection: "row",
    borderRadius: 5,
    width: 200,
  },
  textBox: {
    borderWidth: 1,
    borderColor: "rgb(21, 66, 117)",
    borderRadius: 5,

    padding: 12,
    textAlign: "center",
    width: 100,
    height: 70,
    backgroundColor: "#fff",
    flex: 6,

    fontWeight: 700,
  },
  joinButton: {
    marginLeft: 10,
    flex: 4,
  },
});
