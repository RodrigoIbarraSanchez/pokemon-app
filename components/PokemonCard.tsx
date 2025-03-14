import { Image, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { PokemonBasicInfo } from '@/types/pokemon';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface PokemonCardProps {
  pokemon: PokemonBasicInfo;
  index: number;
}

export function PokemonCard({ pokemon, index }: PokemonCardProps) {
  const pokemonId = index + 1;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/pokemon/${pokemonId}`)}>
      <ThemedView style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <ThemedText style={styles.name}>
          #{pokemonId.toString().padStart(3, '0')} {pokemon.name}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: '50%',
  },
  card: {
    padding: 16,
    borderWidth: 4,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 96,
    height: 96,
    imageRendering: 'pixelated',
  },
  name: {
    marginTop: 8,
    textTransform: 'capitalize',
    fontFamily: 'SpaceMono',
    textAlign: 'center',
  },
});