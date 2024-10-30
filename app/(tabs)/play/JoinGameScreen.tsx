import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function JoinGameScreen() {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');
  return (
    <View style={styles.pageContainer}>
        {/*<Video  
            source={video}
            paused={false}
            style={styles.backgroundVideo}
            repeat={true}
        />*/}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TextInput
                style={styles.textBox}
                value={text}
                onChangeText={onChangeText}
                placeholder={"Enter code"}
            />
            <TouchableOpacity style={styles.button}>
                Join
            </TouchableOpacity>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)",
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  backButton: {
    flex: 1,
    justifyContent: 'center', 
    textAlign: 'center',
    width: 30,
    height: 30,
  },
  textBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#999",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    flex: 1,
    textAlign: "center",
    backgroundColor: "#20c967",
    padding: 12,
    color: "#fff",
    borderRadius: 4,
  },


});
