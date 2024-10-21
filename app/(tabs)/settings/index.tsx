import {
    Text,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    View,
    TouchableOpacity,
    TouchableWithoutFeedbackProps, GestureResponderEvent, Modal, Alert
} from 'react-native';
import React from "react";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {Feather} from "@expo/vector-icons";
import { router } from 'expo-router';
import {settingsOptions} from "@/constants/settingsOptions";

export default function SettingsScreen() {
    return (
        <ScrollView style={styles.container}>
            <View>
                {settingsOptions.map((item) => item.Render())}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
});
