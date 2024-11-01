import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonArray = [];
        for (let i = 1; i <= 151; i++) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const data = await response.json();
          pokemonArray.push(data);
        }
        setPokemonList(pokemonArray);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { pokemon: item })}>
      <View style={styles.pokemonItem}>
        <Image
          source={{ uri: item.sprites.front_default }}
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/13a8f158-01ef-4fe2-a50e-6daf932d43fd/d7adm93-856ace7e-bd90-4f82-9953-0d557aceb07d.png/v1/fill/w_900,h_1273,q_80,strp/twitch_plays_pokemon_by_mizudokei_d7adm93-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI3MyIsInBhdGgiOiJcL2ZcLzEzYThmMTU4LTAxZWYtNGZlMi1hNTBlLTZkYWY5MzJkNDNmZFwvZDdhZG05My04NTZhY2U3ZS1iZDkwLTRmODItOTk1My0wZDU1N2FjZWIwN2QucG5nIiwid2lkdGgiOiI8PTkwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.7RjtDQKAeHcg7CGMXfCvtWWcj4QCbNf-SBqRTQ6M6PU' }} // Substitua pelo URL da sua imagem
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Pokémon List</Text>
        <FlatList
          data={pokemonList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adiciona um leve overlay branco
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonName: {
    fontSize: 18,
  },
});

export default HomeScreen;
