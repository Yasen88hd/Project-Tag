import {ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Link, router, useLocalSearchParams, useRouter} from "expo-router";
import {Feather} from "@expo/vector-icons";
import React, {useState} from "react";
import {MenuOption, RedirectOption, settingsOptions, SwitchOption} from "@/constants/settingsOptions";
import assert from "node:assert";

export default function CategoryPage() {
    const router = useRouter();

    const { category } = useLocalSearchParams();
    return (
        <ScrollView style={styles.container}>
            <View>
                {
                    (settingsOptions.find(x => x.name == category) as MenuOption)
                        .items.map(x => x.Render())
                }
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    title: {
        fontSize: 24,
        // color: '#fff',
        marginBottom: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        // backgroundColor: '#f2f2f2',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 18,
    },
    rowSpacer: {
        flexGrow: 1,
        flexBasis: 0,
    },
});