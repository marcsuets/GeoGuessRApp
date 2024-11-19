import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Header from '../components/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig'; // Asegúrate de importar tu configuración de Firebase
import colors from '../colors';
import {MapView} from 'react-native-maps';
import FinishScreen from './FinishScreen';


export default function GameScreen({navigation}) {
    
    const [data, setData] = useState([]); // Estado para almacenar los datos de Firestore


    // Función para obtener los datos desde Firestore
    const fetchData = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, 'questions'));
          const dataFromFirestore = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), // Agregar los datos de cada documento
          }));
          console.log(JSON.stringify(dataFromFirestore));
          setData(dataFromFirestore); // Guardar los datos en el estado
      } catch (error) {
          console.error("Error al obtener los datos: ", error);
      }
  };   

    return (
    <View style={{ flex: 1, backgroundColor: colors.main}}>
        <Header/>
        <View style={{ flex: 2, backgroundColor: colors.main }}>
          <Text style={styles.questionText}>HOLA</Text>
        </View>
        <View style={{ flex: 7, backgroundColor: colors.main }}>
						
        </View>
        <View style={{ flex: 3, backgroundColor: colors.main }}>
            <View style={{flex: 1}}>
				<Pressable style={styles.buttonCheck} onPress={() => navigation.navigate(FinishScreen)}>
        			<Text style={styles.buttonText}>CHECK GUESS</Text>
      			</Pressable>
            </View>
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
	questionText: {
		textAlign: 'center', // Centra el texto horizontalmente dentro del componente
		color: colors.secondary,
		fontSize: 24,
		fontWeight: 'bold',
		height: '80%',
		width: '90%',
		marginTop: '3%',
		marginRight: '5%',
		marginLeft: '5%',
		padding: '5%',
		/*borderColor: colors.secondary,
		borderWidth: 1,*/
		justifyContent: 'center', // Centra verticalmente
		alignItems: 'center', // Centra horizontalmente
		display: 'flex', // Habilita flexbox
	},
	buttonCheck: {
		marginTop: 20,
		width: '50%',
		height: 60,
		marginLeft: '25%',
		marginRight: '25%',
		backgroundColor: colors.secondary,    
		alignContent: 'center',
		justifyContent: 'center',
		borderRadius: 24,	   
	},
	buttonText: {
		color: colors.main,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20
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
