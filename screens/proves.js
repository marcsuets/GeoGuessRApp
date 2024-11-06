import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import Header from '../components/Header';
import colors from '../colors';
import backgroundImage from '../assets/background.jpg';
import ButtonBase from '../components/ButtonBase';


export default function HomeScreen({ navigation }) {
    return (
    <View style={{ flex: 1, backgroundColor: colors.main }}>
        <Header/>
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={{flex:2}}/>
                <View style={styles.block}>
                    <Text style={styles.text}>Welcome{'\n'}to{'\n'}GeoGuessR </Text>
                    <ButtonBase redirectTO={'Contents'}/>                 
                </View>
                <View style={{flex:3}}/>
            </ImageBackground>
        </View>
    </View>
    );

    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center', 
    },
    text: {
      color: colors.secondary,
      fontSize: 36,
      textAlign: 'center',
      fontWeight: 'bold',
      margin: 30,
      letterSpacing: 2
    },
    block: {
        flex: 4,
        backgroundColor: colors.main,
        borderTopColor: colors.secondary,
        borderTopWidth: 20,
        borderBottomColor: colors.secondary,
        borderBottomWidth: 20,
        alignContent: 'center',
        justifyContent: 'center'
    }
  });
