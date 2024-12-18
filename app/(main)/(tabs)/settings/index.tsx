import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native';
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import {router} from 'expo-router';
import {settingsOptions} from "@/constants/settingsOptions";

export default function SettingsScreen() {
    return (
        <View style={{flex: 1}}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push("/play/")}
                >
                    <AntDesign name="leftcircleo" size={24} color="black"/>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>
                <View>
                    {settingsOptions.map((item) => item.Render())}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    backButtonContainer: {
        position: "absolute",
        top: 15,
        left: 15,
        zIndex: 1,
    },
    backButton: {
    },
});
