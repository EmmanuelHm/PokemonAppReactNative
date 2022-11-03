import React from 'react'
import { Image, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { styles } from '../theme/AppTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets()
    const { simplePokemonList, loadPokemons } = usePokemonPaginated()
    // console.log(simplePokemonList);

    return (
        <>

            <Image
                source={ require('../assets/pokebola.png') }
                style={ styles.pokebolaBG }
            />

            <View
                style={{ alignItems: 'center' }}
            >

                <FlatList 
                    data={ simplePokemonList }
                    keyExtractor={ (pokemon) => pokemon.id }
                    showsVerticalScrollIndicator={false}

                    // Header
                    ListHeaderComponent={(
                        <Text
                            style={{
                                ...styles.title,
                                ...styles.globalMargin,
                                top: top + 20,
                                marginBottom: top + 30
                            }}
                        >
                            Pokedex
                        </Text>
                    )}

                    // Columnas 
                    numColumns={ 2 }
                    renderItem={ ({item}) => <PokemonCard pokemon={item} /> }

                    //Infinite Scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }

                    ListFooterComponent={ (
                        <ActivityIndicator 
                            style={{ height: 100 }}
                            size={ 20 }
                            color='grey'
                        />
                    ) }
                
                />

            </View>
        </>
    )
}
