import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CreateGameScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Create Game Screen</Text>
      <View style={styles.playersContainer}>
        <FlatList
          style={friendStyles.container}
                    data={[
                        {name:'Oliver', isOnline:true},
                        {name:'Jack', isOnline:false},
                        {name:'Daniel', isOnline:false},
                        {name:'Alex', isOnline:true},
                    ]}
                    renderItem={({item: {name, isOnline}}) => (
                        <View style={friendStyles.row} key={name}>
                            <FontAwesome6 name="user-circle" size={36} color="black" style={friendStyles.icon} />

                            <View style={friendStyles.rowSpacer}></View>

                            <Text style={friendStyles.name}>{name}</Text>

                            <View style={friendStyles.rowSpacer}></View>

                            {
                                (isOnline && <Text style={[friendStyles.status, friendStyles.statusOnline]}>Online</Text>)
                                || <Text style={[friendStyles.status, friendStyles.statusOffline]}>Offline</Text>
                            }
                        </View>
                    )}
                >

                </FlatList>
      </View>
      
      <View style={styles.settingsContainer}>

      </View>

      <View style={styles.joinCodeContainer}>
        <Text style={styles.textBox}>Code: {"\n"}DKASMD</Text>
      </View>

      <View style={styles.startButtonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.goBack()}>
          Start Game
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playersContainer: {
    marginTop: 120,
    marginLeft: 30,
    backgroundColor: '#999999',
    //height: 300,
    height: '37%',
    //width: 150,
    width: '40%',
  },
  settingsContainer: {
    marginTop: -295,
    marginLeft: 220,
    backgroundColor: '#999999',
    //height: 450,
    height: '55%',
    //width: 140,
    width: '35.5%',
  },
  joinCodeContainer: {
    marginTop: -100,
    marginLeft: 30,
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
    marginLeft: 97.5,
    marginTop: 100,
    backgroundColor: '#999999',
    height: '8.5%',
    width: '50%',
    justifyContent: 'center',
  },
  startButton: {
    height: '100%',
    width: '100%',
    //backgroundColor: ,
    fontSize: 17,
    alignItems: 'center',
  },
});