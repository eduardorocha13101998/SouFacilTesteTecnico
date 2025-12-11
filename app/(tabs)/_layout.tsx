import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
        <Tabs.Screen
            name="vendas"
            options={{
                title: 'Vendas',
                tabBarIcon: ({ color }) => <FontAwesome5 size={20} name="cube" color={color} />,
            }}
        />
        <Tabs.Screen
            name="clientes"
            options={{
                title: 'Clientes',
                tabBarIcon: ({ color }) => <FontAwesome5 size={20} name="users" color={color} />,
            }}
        />
        <Tabs.Screen
            name="recebimentos"
            options={{
                title: 'Recebimento',
                tabBarIcon: ({ color }) => <FontAwesome5 size={20} name="money-check-alt" color={color} />,
            }}
        />

        <Tabs.Screen
            name="usuarios"
            options={{
                title: 'Usuarios',
                tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="user" color={color} />,
            }}
        />
    </Tabs>
  );
}