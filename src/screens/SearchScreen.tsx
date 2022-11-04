import React, { useState, useEffect } from 'react'
import { View, Text, Platform, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { styles } from '../theme/AppTheme';

const screenWidth = Dimensions.get('window').width

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets()
    const { isFetching, simplePokemonList } = usePokemonSearch()

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

    const [term, setTerm] = useState('')

    useEffect(() => {

        if(term.length === 0){
            return setPokemonFiltered([])
        }

        // Buscar un String
        if(  isNaN( Number(term) ) ){
            
            setPokemonFiltered(
                simplePokemonList.filter(
                    ( poke ) => poke.name.toLowerCase().includes( term.toLowerCase() ) )
            )
        }
        else {

            const pokemonById = simplePokemonList.find(( poke ) => poke.id === term )

            setPokemonFiltered(
                ( pokemonById ) ? [pokemonById] : []
            )
        }

        
    }, [term])

    if( isFetching ) {
        return <Loading />
    }

    return (
        <View 
            style={{ 
                flex: 1,
                marginHorizontal: 20
            }}
        >
            
            <SearchInput 
                onDebounce={ (value) => setTerm(value) }
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 20
                }}
            />

            <FlatList 
                data={ pokemonFiltered }
                keyExtractor={ (pokemon) => pokemon.id }
                showsVerticalScrollIndicator={false}

                // Header
                ListHeaderComponent={(
                    <Text
                        style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            marginTop: top + 70,
                            marginBottom: 10
                        }}
                    >
                        { term }
                    </Text>
                )}

                // Columnas 
                numColumns={ 2 }
                renderItem={ ({item}) => <PokemonCard pokemon={item} /> }

            />

        </View>
    )

}