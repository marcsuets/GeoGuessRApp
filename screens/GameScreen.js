import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Header from '../components/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig'; // Configuración de Firebase
import colors from '../colors';
import MapView, { Marker } from 'react-native-maps';
import FinishScreen from './FinishScreen';

export default function GameScreen({ navigation }) {
  const [data, setData] = useState([]); // Estado para almacenar los datos de Firestore
  const [selectedMarker, setSelectedMarker] = useState(null); // Estado para marcador de usuario

  // Función para obtener los datos desde Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const dataFromFirestore = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          question: data.question,
          location: {
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          },
        };
      });
      setData(dataFromFirestore); // Guardar los datos en el estado
    } catch (error) {
      console.error('Error al obtener los datos: ', error);
    }
  };

  // Llamar a fetchData cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // Manejar clics en el mapa
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedMarker({ latitude, longitude });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.main }}>
      <Header />
      <View style={{ flex: 2, backgroundColor: colors.main }}>
        {data.map((question) => (
          <Text key={question.id} style={styles.questionText}>
            {question.question}
          </Text>
        ))}
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {data.map((question) =>
            question.location?.latitude && question.location?.longitude ? (
              <Marker
                key={question.id}
                coordinate={{
                  latitude: question.location.latitude,
                  longitude: question.location.longitude,
                }}
              />
            ) : null
          )}
          {selectedMarker && (
            <Marker
              coordinate={selectedMarker}
              pinColor="blue" // Color para diferenciar el marcador del usuario
            />
          )}
        </MapView>
      </View>
      <View style={{ flex: 3, backgroundColor: colors.main }}>
        <View style={{ flex: 1 }}>
          <Pressable
            style={styles.buttonCheck}
            onPress={() => navigation.navigate('FinishScreen')}
          >
            <Text style={styles.buttonText}>CHECK GUESS</Text>
          </Pressable>
        </View>
        <View style={styles.viewBottom}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textScore}>Score: 0</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textRound}>Round 1/5</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  questionText: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    height: '80%',
    width: '90%',
    marginTop: '3%',
    marginHorizontal: '5%',
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  buttonCheck: {
    marginTop: 20,
    width: '50%',
    height: 60,
    marginHorizontal: '25%',
    backgroundColor: colors.secondary,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  buttonText: {
    color: colors.main,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewBottom: {
    flex: 1,
    flexDirection: 'row',
  },
  textScore: {
    color: colors.secondary,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 24,
    marginLeft: '5%',
    padding: '5%',
  },
  textRound: {
    color: colors.secondary,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 24,
    marginRight: '5%',
    padding: '5%',
  },
  mapContainer: {
    flex: 7,
    backgroundColor: colors.main,
    borderRadius: 24,
    overflow: 'hidden',
    marginHorizontal: '5%',
    borderColor: colors.secondary,
    borderWidth: 7,
  },
  map: {
    flex: 1,
    marginBottom: -30,
  },
});
