import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function App() {
  const [currentTrain, setCurrentTrain] = useState(null);
  const [platforms, setPlatforms] = useState(Array(15).fill(null));

  useEffect(() => {
    spawnTrain();
  }, []);

  const spawnTrain = () => {
    const trainName = `Train ${Math.floor(Math.random() * 1000)}`;
    setCurrentTrain(trainName);
  };

  const assignPlatform = (index) => {
    if (!currentTrain) return;
    const updatedPlatforms = [...platforms];
    updatedPlatforms[index] = currentTrain;
    setPlatforms(updatedPlatforms);
    Alert.alert('Train Assigned', `${currentTrain} assigned to Platform ${index + 1}`);
    setCurrentTrain(null);
    setTimeout(spawnTrain, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚉 New Delhi Railway Station</Text>
      <Text style={styles.subtitle}>
        {currentTrain ? `Incoming: ${currentTrain}` : 'Waiting for next train...'}
      </Text>
      <ScrollView contentContainerStyle={styles.platformContainer}>
        {platforms.map((train, index) => (
          <TouchableOpacity
            key={index}
            style={styles.platform}
            onPress={() => assignPlatform(index)}
          >
            <Text style={styles.platformText}>Platform {index + 1}</Text>
            <Text style={styles.trainText}>{train || 'Empty'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
  platformContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  platform: {
    width: '30%',
    backgroundColor: '#d1e7dd',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  platformText: { fontSize: 16, fontWeight: '600' },
  trainText: { fontSize: 14, color: '#555' },
});
