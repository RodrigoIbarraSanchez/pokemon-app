import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getColorForPokemonType, getPokemonDetail } from '@/services/pokemonService';
import { PokemonDetail } from '@/types/pokemon';

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const data = await getPokemonDetail(id);
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching pokemon detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (isLoading || !pokemon) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const backgroundColor = getColorForPokemonType(mainType);

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Image
        source={{
          uri: pokemon.sprites.other['official-artwork'].front_default,
        }}
        style={styles.image}
      />
      <ThemedText type="title" style={styles.name}>
        #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
      </ThemedText>

      <ThemedView style={styles.typesContainer}>
        {pokemon.types.map(({ type }) => (
          <ThemedView
            key={type.name}
            style={[styles.typeTag, { backgroundColor: getColorForPokemonType(type.name) }]}>
            <ThemedText style={styles.typeText}>{type.name}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        {pokemon.stats.map(({ stat, base_stat }) => (
          <ThemedView key={stat.name} style={styles.statRow}>
            <ThemedText style={styles.statName}>{stat.name}:</ThemedText>
            <ThemedText style={styles.statValue}>{base_stat}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.infoContainer}>
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Height:</ThemedText>
          <ThemedText style={styles.infoValue}>{pokemon.height / 10}m</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Weight:</ThemedText>
          <ThemedText style={styles.infoValue}>{pokemon.weight / 10}kg</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  name: {
    fontSize: 32,
    marginTop: 16,
    textTransform: 'capitalize',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  typeTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  typeText: {
    color: '#ffffff',
    textTransform: 'uppercase',
    fontFamily: 'SpaceMono',
    fontSize: 12,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    width: '100%',
    borderWidth: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statName: {
    textTransform: 'capitalize',
    fontFamily: 'SpaceMono',
  },
  statValue: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    borderWidth: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: 'SpaceMono',
  },
  infoValue: {
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
  },
});