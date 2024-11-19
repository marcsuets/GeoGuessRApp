import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import FinishScreen from './screens/FinishScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false ,  animation: 'none'}} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="FinishScreen" component={FinishScreen} options={{ headerShown: false ,  animation: 'none'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
