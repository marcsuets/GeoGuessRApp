import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Page1 from './screens/Page1'; // Exemple d'una altra pantalla
import Content from './screens/Content'; // Exemple d'una pantalla
import DetailsScreen from './screens/DetailsScreen'; // Exemple d'una altra pantalla
import proves from './screens/proves';
import Page2 from './screens/Page2'; // Exemple d'una altra pantalla

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="proves">
        <Stack.Screen name="proves" component={proves} options={{ headerShown: false ,  animation: 'none'}} />
        <Stack.Screen name="Content" component={Content} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false ,  animation: 'none'}} />
        <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false ,  animation: 'none'}} />
        
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
