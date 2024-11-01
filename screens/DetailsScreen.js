import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.pokemonImage}
      />
      <Text style={styles.label}>Height: {pokemon.height}</Text>
      <Text style={styles.label}>Weight: {pokemon.weight}</Text>
      <Text style={styles.label}>Base Experience: {pokemon.base_experience}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 2,
  },
});

export default DetailsScreen;
