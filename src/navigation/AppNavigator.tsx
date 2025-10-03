import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// --- Theme Constants for Navigation ---
const PRIMARY_COLOR_NAV = '#146EF5'; // A deeper, richer blue for the header
const BACKGROUND_COLOR_NAV = '#FFFFFF'; // White background for modern look
const TEXT_COLOR_NAV = '#FFFFFF';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}
      screenOptions={{
        headerStyle: {
          backgroundColor: PRIMARY_COLOR_NAV,
        },
        headerTintColor: TEXT_COLOR_NAV,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ 
          title: 'Sign In',
          headerStyle: {
            backgroundColor: BACKGROUND_COLOR_NAV, 
          },
          headerTintColor: PRIMARY_COLOR_NAV, 
          headerTitleStyle: {
            fontWeight: '900',
            fontSize: 24,
          }
        }} 
      />
      
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'User List', 
          headerBackVisible: false,
        }} 
      />
      
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ 
          title: 'User Details',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17,
          }
        }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;