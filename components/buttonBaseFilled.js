import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import  colors from '../colors';
import { useNavigation } from '@react-navigation/native';


export default function ButtonBaseFilled({text, redirectTO}) {

  const navigation = useNavigation();

  return (
    <View>
      <Pressable style={styles.button} onPress={() => navigation.navigate(redirectTO)}>
        <Text style={styles.Label}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    height: 60,
    marginLeft: '25%',
    marginRight: '25%',
    backgroundColor: colors.secondary,    
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 24,
   
  },
  Label: {
    color: colors.main,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
});