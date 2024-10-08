import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {View} from "react-native";
// import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
        <Tabs.Screen
            name="friends"
            options={{
                title: 'Friends',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="index"
            options={{
                title: 'Play',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'game-controller' : 'game-controller-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="settings"
            options={{
                title: 'Settings',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'cog' : 'cog-outline'} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}
