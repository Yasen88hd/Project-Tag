import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScaledSize, TouchableOpacity, Dimensions, Modal, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

export default function CreateGameScreen() {
  const navigation = useNavigation();
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedOption, setSelectedOption] = useState('random');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

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

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require('../../../../assets/images/cyclists.png')}
          style={{
            width: screenWidth,
            height: screenHeight,
            flex: 1,
          }}
          resizeMode="cover"
        />
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Riders' Run</Text>
      </View>

      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startGameButton}>
          <Text style={styles.startGameText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={() => setShowSettings(true)}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.playerSection}>
        <ScrollView style={styles.playerScrollContainer} contentContainerStyle={styles.playerScrollContent}>
          <View style={styles.player}>
            <AntDesign name="user" size={20} color="white" style={styles.profileIcon} />
            <Text style={styles.playerText}>Player 1</Text>
          </View>
          <View style={styles.player}>
            <AntDesign name="user" size={20} color="white" style={styles.profileIcon} />
            <Text style={styles.playerText}>Player 2</Text>
          </View>
          <View style={styles.player}>
            <AntDesign name="user" size={20} color="white" style={styles.profileIcon} />
            <Text style={styles.playerText}>Player 3</Text>
          </View>
          <View style={styles.player}>
            <AntDesign name="user" size={20} color="white" style={styles.profileIcon} />
            <Text style={styles.playerText}>Player 4</Text>
          </View>
          <View style={styles.player}>
            <AntDesign name="user" size={20} color="white" style={styles.profileIcon} />
            <Text style={styles.playerText}>Player 5</Text>
          </View>
          <View style={styles.player}>
            <AntDesign name="user" size={20} color="white" style={styles.profileIcon} />
            <Text style={styles.playerText}>Player 6</Text>
          </View>

        </ScrollView>
        <View style={styles.bottomIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="qrcode" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="link" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent={true} visible={showSettings} onRequestClose={handleCloseSettings}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Settings</Text>
              <TouchableOpacity onPress={handleCloseSettings}>
                <AntDesign name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.label}>Select Option</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={selectedOption} style={styles.picker} itemStyle={styles.pickerItem} onValueChange={(itemValue) => setSelectedOption(itemValue)}>
                  <Picker.Item label="Random" value="random" />
                  <Picker.Item label="Custom" value="custom" />
                </Picker>
              </View>

              <Text style={styles.label}>Set Timer</Text>
              <View style={styles.timerInputContainer}>
                <TextInput
                  style={styles.timerInput}
                  placeholder="Minutes"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  keyboardType="numeric"
                  value={minutes}
                  onChangeText={setMinutes}
                />
                <Text style={styles.colon}>:</Text>
                <TextInput
                  style={styles.timerInput}
                  placeholder="Seconds"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  keyboardType="numeric"
                  value={seconds}
                  onChangeText={setSeconds}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  backButton: {},
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    alignItems: 'center',
  },
  headingContainer: {
    marginTop: 130,
  },
  headingText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(230, 230, 0)',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  settingsButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgb(51, 173, 255)',
    shadowRadius: 20,
    marginTop: 20,
    backgroundColor: 'rgb(51, 173, 255)',
  },
  startGameButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgb(255, 51, 51)',
    shadowRadius: 20,
    backgroundColor: 'rgb(255, 51, 51)',
  },
  settingsText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Apple Chancery, cursive',
  },
  startGameText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Apple Chancery, cursive',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#101723',
    borderRadius: 10,
    padding: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5f0f0',
    fontFamily: 'Apple Chancery, cursive',
  },
  modalBody: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#f5f0f0',
    fontFamily: 'Apple Chancery, cursive',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#f5f0f0',
    backgroundColor: '#101723',
  },
  pickerItem: {
    height: 50,
    width: '100%',
    color: '#f5f0f0',
  },
  timerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    textAlign: 'right',
    flex: 1,
    width: 70,
    color: '#f5f0f0',
    backgroundColor: '#101723',
  },
  colon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: '#f5f0f0',
  },
  playerSection: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    width: 220,
    height: 220,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    padding: 5,
  },
  playerScrollContainer: {
    flex: 1,
  },
  playerScrollContent: {
    paddingBottom: 40,
  },
  player: {
    width: '100%',
    height: 35,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: 'white',
    borderTopColor: 'white',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 2,
    flexDirection: 'row',
  },
  profileIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  playerText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  bottomIcons: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 220,
    paddingHorizontal: 10,
    backgroundColor: '#101723',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
