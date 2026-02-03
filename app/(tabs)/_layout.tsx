import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Circle, List, Activity } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#333',
          platform: Platform.OS === 'ios' ? 'absolute' : 'relative',
        },
        tabBarActiveTintColor: '#0F0',
        tabBarInactiveTintColor: '#555',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'HUD',
          tabBarIcon: ({ color }) => <Circle color={color} />,
        }}
      />
      <Tabs.Screen
        name="mission-log"
        options={{
          title: 'Mission Log',
          tabBarIcon: ({ color }) => <List color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => <Activity color={color} />,
        }}
      />
    </Tabs>
  );
}
