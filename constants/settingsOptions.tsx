import {Href, router} from "expo-router";
import {StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React, {ReactNode, useState} from "react";
import {AntDesign} from "@expo/vector-icons";

export abstract class SettingsOption {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public abstract Render() : ReactNode;
}

export  class MenuOption extends SettingsOption {
    items: SettingsOption[];
    constructor(name: string, items: SettingsOption[]) {
        super(name);
        this.items = items;
    }

    public Render(): ReactNode {
        return (
            <TouchableOpacity
                style={styles.row}
                key={this.name}
                onPress={
                    () => {
                            router.navigate(`/settings/${this.name}`);
                        }
                    }
                    >
                    <Text>{this.name}</Text>

                    <View style={styles.rowSpacer}></View>

                    <Feather
                color="#C6C6C6"
                name="chevron-right"
                size={20} />
            </TouchableOpacity>
        );
    }
}

export  class SwitchOption extends SettingsOption {
    public Render(): React.ReactNode {
        const [childState, setChildState] = useState(false);
        return (
            <TouchableOpacity
                style={styles.row}
                key={this.name}
                onPress={
                    () => {
                        setChildState(!childState);
                    }
                }
            >
                <Text>{this.name}</Text>

                <View style={styles.rowSpacer}></View>

                <Switch value={childState} />
            </TouchableOpacity>
        )
    }
}

export  class RedirectOption extends SettingsOption {
    location: Href<string>;
    constructor(name: string, location: Href<string>) {
        super(name);
        this.location = location;
    }

    public Render(): React.ReactNode {
        return (
            <TouchableOpacity
                style={styles.row}
                key={this.name}
                onPress={
                    () => {
                        router.push(this.location);
                    }
                }
            >
                <Text>{this.name}</Text>

                <View style={styles.rowSpacer}></View>

                <Feather name="link-2" size={20} color="black" />
            </TouchableOpacity>
        )
    }
}

export  class BackButton extends SettingsOption {
    public Render(): React.ReactNode {
        return (
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push("/settings/")}
                >
                    <AntDesign name="leftcircleo" size={24} color="black"/>
                </TouchableOpacity>
            </View>
        )
    }
}

export const settingsOptions : SettingsOption[] = [
    new MenuOption('Account details',
        [
            new BackButton(""),
            new SwitchOption('Change username'),
            new SwitchOption('Change password'),
            new SwitchOption('Change profile picture'),
            new RedirectOption('Sign out', '/'),
        ]),
    new MenuOption('Notifications', [
        new BackButton(""),
    ]),
    new MenuOption('Appearance', [
        new BackButton(""),
    ]),
    new RedirectOption('About', '/'),
];

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    row: {
        position: "relative",
        top: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 18,
    },
    rowSpacer: {
        flexGrow: 1,
        flexBasis: 0,
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