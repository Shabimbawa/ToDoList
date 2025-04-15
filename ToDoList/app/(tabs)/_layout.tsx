import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';


// Import your LoginPage here (Make sure it's set up in a separate component)
import LoginPage from '../LoginPage';  // This is where you'd define your LoginPage
import { useToDo } from '@/context/ToDoContext'; // Import your context

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { loggedInUser, logoutUser } = useToDo(); // Get loggedInUser from context
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // If there's a logged-in user in context, we set the login state to true
    if (loggedInUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log('Current logged-in user:', loggedInUser);
  }, [loggedInUser]); // Re-run this whenever loggedInUser changes

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage/>;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="currentToDo"
        options={{
          title: 'ToDo',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/ToDoing.png')} // Adjust the path to your image
            style={{ width: 28, height: 28, tintColor: color }} // Ensure correct size and tint
            />
          ),
        }}
      />
      <Tabs.Screen
        name="completedToDo"
        options={{
          title: 'Completed',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/Completeding.png')} // Adjust the path to your image
            style={{ width: 28, height: 28, tintColor: color }} // Ensure correct size and tint
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/Profiling.png')} // Adjust the path to your image
            style={{ width: 28, height: 28, tintColor: color }} // Ensure correct size and tint
            />
          ),
        }}
      />
    </Tabs>
  );
}
