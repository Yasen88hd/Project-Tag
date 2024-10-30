import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, Dimensions, ScaledSize, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Navigation hook for React Native
import { useRouter } from 'expo-router';

export default function HomeScreen() {
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

  const navigation = useRouter();

  const handleCreateGame = () => {
    navigation.navigate('/(tabs)/play/CreateGameScreen'); // Navigates to 'CreateGame'
  };

  const handleJoinGame = () => {
    navigation.navigate('/(tabs)/play/JoinGameScreen'); // Navigates to 'JoinGame'
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        { 
        <ImageBackground
          source={require('../../../assets/images/proba.png')}
          style={{
            width: screenWidth,
            height: screenHeight,
            flex: 1,
          }}
          resizeMode="cover"
        /> }
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonCreate} onPress={handleCreateGame}>
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buttonJoin} onPress={handleJoinGame}>
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCreate: {
    marginTop: 80,
    height: 100,
    width: 250,
    transform: 'rotateZ(-25deg)',
    borderRadius: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 14,
    borderColor: '#2859de',
    elevation: 30,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonJoin: {
    marginTop: 120,
    height: 100,
    width: 250,
    backgroundColor: '#20c967',
    transform: 'rotateZ(25deg)',
    borderRadius: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 14,
    borderColor: '#18994e',
    elevation: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
