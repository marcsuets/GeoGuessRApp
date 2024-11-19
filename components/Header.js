import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  colors from '../colors';

export default function Header() {
  return (
    <View style={{backgroundColor: colors.main}}>
      <View style={styles.header}>
      <View style={{flex:1}}/>
      <Text style={styles.text}>GeoGuessR</Text>
    </View>
  
    </View>
    );
}

const styles = StyleSheet.create({
  header: {
    // Box
    backgroundColor: colors.main,
    width: '100%',
    height: 120,
    justifyContent: 'center',
    marginTop: 0,
    paddingBottom: 12,
    
    //Border
    borderColor: colors.secondary,
    borderWidth: 10,
    borderTopWidth: 0,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  text: {
    flex: 1,
    color: colors.secondary,
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    paddingBottom: 10
  },
});