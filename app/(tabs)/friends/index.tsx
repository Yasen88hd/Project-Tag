import {
    Text,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    View,
    TouchableOpacity,
    TouchableWithoutFeedbackProps, GestureResponderEvent, Modal, Alert, Button, FlatList
} from 'react-native';
import React from "react";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {Feather, FontAwesome6} from "@expo/vector-icons";
import {Link, router} from 'expo-router';

export default function FriendsScreen() {
    return (
        <View style={pageStyles.container}>
            <View>
                <View style={pageStyles.header}>
                    <Link href={'/(tabs)/friends/addFriend'}>
                        <TouchableOpacity style={pageStyles.control}>
                            <FontAwesome6 name="add" size={24} style={pageStyles.controlItem} />
                            <Text style={pageStyles.controlItem}>Add friend</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
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
        </View>
    );
}

const pageStyles = StyleSheet.create({
    container: {
        margin: 12,
    },
    header: {
        position: "absolute",
        top: 0,
        right: 0,
        height: 32,
    },
    control: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#09f",
        borderRadius: 50,
        color: "#fff",
        padding: 4,
    },
    controlItem: {
        marginHorizontal: 12,
    },
});

const friendStyles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 32,
        left: "50%",
        transform: "translate(-50%)",
        maxWidth: 500,
        minWidth: 300,
        width: "100%",
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 12,
    },
    rowSpacer: {
        flex: 1,
    },
    icon: {

    },
    name: {
        fontSize: 20,
    },
    status: {
        fontSize: 16,
        fontStyle: "italic",
    },
    statusOnline: {
        color: "#0c6",
    },
    statusOffline: {
        color: "#ff5050",
    },
});
