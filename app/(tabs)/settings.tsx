import {Text, Image, StyleSheet, Platform, ScrollView, View, TouchableOpacity} from 'react-native';
import React from "react";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {Feather} from "@expo/vector-icons";

export default function SettingsScreen() {
    const settingsArr : string[] = ["Brightness", "Notifications", "Account details"];
  return (
    <ScrollView>
      <View>
        <Text>Category</Text>

        <TouchableOpacity style={styles.row}>
          <TabBarIcon name={'options'} />

          <Text>Option 1</Text>

          <View style={styles.rowSpacer}></View>

          <Feather
              color="#C6C6C6"
              name="chevron-right"
              size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    // backgroundColor: '#f2f2f2',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    maxWidth: 250,
  },
  rowSpacer: {
    flexGrow: 1,
    flexBasis: 0,
  },
});
