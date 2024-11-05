import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ImageBackground, ScaledSize, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { StyleSource } from '@maplibre/maplibre-react-native';

export default function CreateGameScreen() {
  const navigation = useNavigation();
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
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


  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        { 
        <ImageBackground
          source={require('../../../../assets/images/forest3.png')}
          style={{
            width: screenWidth,
            height: screenHeight,
            flex: 1,
          }}
          resizeMode="cover"
        /> }
      </View>

      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.playersContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Players</Text>
        </View>
        <FlatList
          style={styles.container}
          data={[
           {name:'Oliver'},
           {name:'Jack'},
           {name:'Daniel'},
           {name:'Alex'},
                    ]}
          renderItem={({item: {name}}) => (
          <View style={styles.row} key={name}>
            <FontAwesome6 name="user-circle" size={20} color="black"/>
            <Text style={styles.name}>   {name}</Text>
          </View>
          )}
          >
          </FlatList>
      </View>
      
      <View style={styles.settingsContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.mainSettingsPart}>
        
          <Text style={styles.contentText}>Seeker selection:</Text>
          
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Random" value="random" />
            <Picker.Item label="Custom" value="custom" />
          </Picker>

          <Text style={styles.contentText}>Waiting period:</Text>

          <View style={styles.timeInputContainer}>
            <TextInput
              style={styles.textBoxTime}
              keyboardType="numeric"
              value={minutes}
              onChangeText={setMinutes}
              placeholder="0"
            />
            <Text style={styles.label}> m </Text>
            <TextInput
              style={styles.textBoxTime}
              keyboardType="numeric"
              value={seconds}
              onChangeText={setSeconds}
              placeholder="0"
            />
            <Text style={styles.label}> s </Text>
          </View>

        </View>

      </View>

      <View style={styles.joinCodeContainer}>
        <Text style={styles.textBox}>Code: {"\n"}DKASMD</Text>
      </View>

      <View style={styles.startButtonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Start Game</Text>
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
    bottom: 0,
    right: 0,
  },
  playersContainer: {
    //marginTop: 120,
    marginTop: '30%',
    //marginLeft: 30,
    marginLeft: '8%',
    backgroundColor: '#999999',
    //height: 300,
    height: '37%',
    //width: 150,
    width: '40%',
    borderWidth: 1.5,
  },
  row: {
    marginLeft: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    marginVertical: 3,
  },
  name: {
    fontSize: 17,
  },
  header: {
    height: '10%',
    width: '100%',
    borderBottomWidth: 1.5,
    borderColor: "#000",
    textAlign: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  settingsContainer: {
    //marginTop: -295,
    marginTop: '-75%',
    //marginLeft: 220,
    marginLeft: '55%',
    backgroundColor: '#999999',
    //height: 450,
    height: '55%',
    //width: 140,
    width: '35.5%',
    borderWidth: 1.5,
  },
  mainSettingsPart: {
    flex: 1,
    alignItems: 'center',
  },
  contentText: {
    marginTop: '15%',
    marginBottom: '10%',
    fontSize: 17,
  },
  picker: {
    width: '70%',
    height: 50,
    textAlign: 'center',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
  },
  textBoxTime: {
    padding: 10,
    borderWidth: 1,
    width: 30,
    borderRadius: 5,
    borderColor: "#000",
    backgroundColor: '#fff',
    textAlign: "center",
  },  
  joinCodeContainer: {
    //marginTop: -100,
    marginTop: '-20%',
    //marginLeft: 30,
    marginLeft: '8%',
    backgroundColor: '#fff',
    //height: 70,
    height: '8.5%',
    //width: 150,
    width: '40%',
  },
  textBox: {
    height: '100%',
    width: '100%',
    borderWidth: 1.5,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 17,
  },
  startButtonContainer: {
    //marginLeft: 97.5,
    marginLeft: '25%',
    //marginTop: 100,
    marginTop: '24%',
    height: '8.5%',
    width: '50%',
    justifyContent: 'center',
  },
  startButton: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#20c967',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#18994e',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 10,
  },
  buttonText: {
    fontSize: 17,
    color: '#ffffff',
  },
  backButtonContainer: {
    top: 15,
    left: 15,
  },
  backButton: {
  },
});