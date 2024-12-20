import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Header from '../components/Header';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import colors from '../colors';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function GameScreen({ navigation }) {
  const [data, setData] = useState([]); // Preguntas de Firestore
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de la pregunta actual
  const [selectedMarker, setSelectedMarker] = useState(null); // Marcador del usuario
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // Mostrar punto correcto
  const [distance, setDistance] = useState(null);
  const [mapInteractable, setMapInteractable] = useState(true); // Inicialmente interactuable
  const [score, setScore] = useState(0); // Puntuación total


  // Obtener datos de Firestore
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
      setData(dataFromFirestore);
    } catch (error) {
      console.error('Error al obtener los datos: ', error);
    }
  };

  // Ejecutar fetchData al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Manejar clics en el mapa
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedMarker({ latitude, longitude });
  };

  // Calcular distancia en kilómetros entre dos puntos
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  };

  const handleCheckGuess = () => {
    if (selectedMarker && correctLocation) {
      const calculatedDistance = calculateDistance(
        selectedMarker.latitude,
        selectedMarker.longitude,
        correctLocation.latitude,
        correctLocation.longitude
      );
      setDistance(calculatedDistance.toFixed(2)); // Mostrar la distancia
  
      // Calcular puntaje (por ejemplo, si la distancia es menor a 1 km, obtienes 10 puntos)
      let points = 0;
      if (calculatedDistance < 1) {
        points = 10; 
      } else if (calculatedDistance < 5) {
        points = 7;  
      }else if (calculatedDistance < 10) {
        points = 5;  
      }else if (calculatedDistance < 100) {
        points = 3; 
      }else if (calculatedDistance < 1000) {
        points = 1;  
      } else {
        points = 0;  
      }
  
      setScore(prevScore => prevScore + points); // Acumular puntos
      setShowCorrectAnswer(true);
      setMapInteractable(false); // Deshabilitar la interacción con el mapa
    }
  };
  
  
  const resetMap = () => {
    setMapInteractable(true);
  };

  // Avanzar a la siguiente ronda
  const handleNextRound = () => {
    if (currentIndex + 1 >= data.length) {
      navigation.navigate('FinishScreen', { score: score });
    } else {
      setSelectedMarker(null);
      setShowCorrectAnswer(false);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      resetMap();
    }
  };

  if (currentIndex >= data.length) {
    // Si se completan todas las rondas
    return (
      <View style={styles.container}>
        <Text style={styles.finalText}>Cargando...</Text>
      </View>
    );
  }

  const currentQuestion = data[currentIndex];
  const correctLocation = currentQuestion?.location;

  return (
    <View style={{ flex: 1, backgroundColor: colors.main }}>
      <Header />
      <View style={{ flex: 2, backgroundColor: colors.main }}>
        <Text style={styles.questionText}>{currentQuestion?.question}</Text>  
        {showCorrectAnswer && distance && (
          <Text style={styles.finalText}>
            Distance: {distance} km
          </Text>
        )}     
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 20.0,
            longitude: 0.0,
            latitudeDelta: 100,
            longitudeDelta: 100,
          }}
          onPress={mapInteractable ? handleMapPress : null}
          customMapStyle={[
            {
              featureType: "poi",
              stylers: [
                { visibility: "off" }
              ]
            },
            {
              featureType: "transit.station",
              stylers: [
                { visibility: "off" }
              ]
            }
          ]}
        >
          {selectedMarker && (
            <Marker
              coordinate={selectedMarker}
              pinColor={colors.secondary}
            />
          )}
          {showCorrectAnswer && correctLocation && (
            <Marker
              coordinate={correctLocation}
              pinColor={colors.secondary}
            />
          )}
          {selectedMarker && showCorrectAnswer && correctLocation && (
            <Polyline
              coordinates={[
                selectedMarker,
                correctLocation,
              ]}
              strokeColor={colors.main}
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>
      <View style={{ flex: 3, backgroundColor: colors.main }}>
        <View style={{ flex: 1 }}>
          {!showCorrectAnswer ? (
            <Pressable style={styles.buttonCheck} onPress={handleCheckGuess}>
              <Text style={styles.buttonText}>CHECK GUESS</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.buttonCheck} onPress={handleNextRound}>
              <Text style={styles.buttonText}>NEXT ROUND</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.viewBottom}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textScore}>Score: {score}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textRound}>Round {currentIndex+1}/5</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.main,
  },
  finalText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  questionText: {
    textAlign: 'center',
    color: colors.secondary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '10%'
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
  textScore: {
    color: colors.secondary,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
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
});
