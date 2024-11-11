import {Button, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {gray} from "colorette";

export default function addFriendScreen() {
    const [text, onChangeText] = React.useState('');
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textBox}
                value={text}
                onChangeText={onChangeText}
                placeholder={"Enter username"}
            />
            <TouchableOpacity
                style={styles.button}
            >
                Add friend
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 12,
    },
    textBox: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#999",
        textAlign: "center",
    },
    button: {
        marginTop: 20,
        textAlign: "center",
        backgroundColor: "#0cf",
        padding: 12,
        color: "#fff",
        borderRadius: 4,
    },
});
