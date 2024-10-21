import {ScrollView, StyleSheet, View} from "react-native";
import React from "react";

export default function addFriendScreen() {
    return (
        <ScrollView style={styles.container}>
            <View>
                You've got work to do here MAN!
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
});
