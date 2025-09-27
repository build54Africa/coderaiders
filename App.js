import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SvgXml } from 'react-native-svg';

import { ThemeProvider } from './ThemeContext';
import { LessonProvider } from './LessonContext';
import { UserProvider, UserContext } from './UserContext';

import CourseScreen from './screens/CourseScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import LessonDetailScreen from './screens/LessonDetailScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Your original SVGs
const homeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V9.5z"/></svg>`;
const dashboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
const profileIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>`;

// Home stack (Courses + Lesson Detail)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Courses" component={CourseScreen} />
      <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
    </Stack.Navigator>
  );
}

// Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarIcon: () => <SvgXml xml={homeIcon} width="24" height="24" /> }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarIcon: () => <SvgXml xml={dashboardIcon} width="24" height="24" /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <SvgXml xml={profileIcon} width="24" height="24" /> }}
      />
    </Tab.Navigator>
  );
}

// Root Stack: show login if no user, otherwise main tabs
function RootStack() {
  const { user } = React.useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
}

// App
export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <LessonProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </LessonProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
