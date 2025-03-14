import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import { PokemonCard } from '@/components/PokemonCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPokemonList } from '@/services/pokemonService';
import { PokemonBasicInfo } from '@/types/pokemon';

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<PokemonBasicInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await getPokemonList(offset);
      setPokemons(prev => [...prev, ...response.results]);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    } finally {
      setIsLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const handleLoadMore = () => {
    setOffset(prev => prev + 20);
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <ThemedView style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  };

  if (isLoading && pokemons.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Pokédex
      </ThemedText>
      <FlatList
        data={pokemons}
        renderItem={({ item, index }) => <PokemonCard pokemon={item} index={index} />}
        keyExtractor={item => item.name}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'SpaceMono',
  },
  listContainer: {
    paddingBottom: 16,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
