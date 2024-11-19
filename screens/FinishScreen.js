import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import colors from '../colors';
import Header from '../components/Header';
import ButtonBaseFilled from '../components/buttonBaseFilled';

export default function FinishScreen() {
  
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.main}}>
        <Header/>
        <View style={{flex: 5}}>
          <View style={{flex: 1}}>
            <Text style={styles.textWellDone}>WELL DONE!</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textFS}>Final score</Text>
            <Text style={styles.textPoints}>1630 points</Text>
          </View>
          <View style={{flex: 1}}>
            <ButtonBaseFilled redirectTO={'HomeScreen'} text={'PLAY AGAIN'}/>
          </View>
        </View>
          <View style={{flex: 1}}>
            <View style={styles.viewBottom}>
            <View style={{flex:1}}>
              <Text style={styles.textScore}>Score: 0</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.textRound}>Round 1/5</Text>
            </View>
            </View>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textWellDone: {
    color: colors.secondary,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    height: '30%',
    marginTop: '30%',
    letterSpacing: 2
  },
  textFS: {
    color: colors.secondary,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  textPoints: {
    color: colors.secondary,
    fontSize: 48,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  viewBottom: {
		flex:1,
		flexDirection: 'row'
	},
	textScore: {
		color: colors.secondary,
		fontWeight: 'bold',
		textAlign: 'left', // Centra el texto horizontalmente dentro del componente
		fontSize: 24,		
		marginLeft: '5%',
		padding: '5%',
	},
	textRound: {
		color: colors.secondary,
		fontWeight: 'bold',
		textAlign: 'right', // Centra el texto horizontalmente dentro del componente
		fontSize: 24,		
		marginRight: '5%',
		padding: '5%',
	}
});
