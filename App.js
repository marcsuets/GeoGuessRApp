import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Exemple d'una altra pantalla
import Content from './screens/Content';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false ,  animation: 'none'}} />
        <Stack.Screen name="Content" component={Content} options={{ headerShown: false ,  animation: 'none'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
