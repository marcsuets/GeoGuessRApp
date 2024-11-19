import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig'; // Asegúrate de importar tu configuración de Firebase
import colors from '../colors';


export default function HomeScreen({ navigation }) {
    
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
        <View style={{ flex: 6, backgroundColor: colors.secondary }}>
          
        </View>
        <View style={{ flex: 3, backgroundColor: colors.main }}>
            <View style={{flex: 2}}>

            </View>
            <View style={{flex: 1}}>

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
});
