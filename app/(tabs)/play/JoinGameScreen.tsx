import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function JoinGameScreen() {
  const navigation = useNavigation(); // Hook to get access to the navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Game Screen</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Go Back to Home"
          onPress={() => navigation.goBack()} // This will take you back to the previous screen
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
