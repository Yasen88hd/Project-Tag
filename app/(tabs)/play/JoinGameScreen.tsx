import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Dimensions, ScaledSize, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Video from 'react-native-video';

export default function JoinGameScreen() {
  
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const handleResize = (dims: { window: ScaledSize; screen: ScaledSize }) => {
      setScreenWidth(dims.window.width);
      setScreenHeight(dims.window.height);
    };
    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.backgroundContainer}>
        { 
        <ImageBackground
          source={require('../../../assets/images/forest2.png')}
          style={{
            width: screenWidth,
            height: screenHeight,
            flex: 1,
          }}
          resizeMode="cover"
        /> }
      </View>
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
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
