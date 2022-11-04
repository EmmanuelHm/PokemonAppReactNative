import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull
}

export const PokemonDetails = ({pokemon} : Props) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject
            }}
        >

            {/* Types y peso */}
            <View 
                style={{
                    ...style.container,
                    marginTop: 370
                }}
            >
                <Text style={style.title}>Types</Text>

                <View style={{ flexDirection: 'row'}}>
                    {
                        pokemon.types.map( ({ type }) => (
                            <Text 
                                key={type.name} 
                                style={{
                                    ...style.regularText,
                                    marginRight: 10
                                }}
                            >
                                { type.name }
                            </Text>
                        ))
                    }
                </View>

                <Text style={style.title}>Peso</Text>
                <Text style={style.regularText}>{pokemon.weight} kg</Text>

            </View>

            {/* Sprites */}
            <View style={style.container} >
                <Text style={style.title}>Sprites</Text>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage 
                    uri={pokemon.sprites.front_default}
                    style={style.basicSprite}
                />

                <FadeInImage 
                    uri={pokemon.sprites.back_default}
                    style={style.basicSprite}
                />

                <FadeInImage 
                    uri={pokemon.sprites.front_shiny}
                    style={style.basicSprite}
                />

                <FadeInImage 
                    uri={pokemon.sprites.back_shiny}
                    style={style.basicSprite}
                />
            </ScrollView>

            {/* Habilities */}
            <View style={{...style.container }} >
                <Text style={style.title}>Basic Skills</Text>

                <View style={{ flexDirection: 'row'}}>
                    {
                        pokemon.abilities.map( ({ ability }) => (
                            <Text 
                                key={ability.name} 
                                style={{
                                    ...style.regularText,
                                    marginRight: 10
                                }}
                            >
                                { ability.name }
                            </Text>
                        ))
                    }
                </View>

            </View>

            {/* Movimientos */}
            <View style={{...style.container }} >
                <Text style={style.title}>Movements</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        pokemon.moves.map( ({ move }) => (
                            <Text 
                                key={move.name} 
                                style={{
                                    ...style.regularText,
                                    marginRight: 10
                                }}
                            >
                                { move.name }
                            </Text>
                        ))
                    }
                </View>

            </View>

            {/* Stats */}
            <View style={{...style.container }} >
                <Text style={style.title}>Stats</Text>

                <View>
                    {
                        pokemon.stats.map( (stat, i) => (
                            <View 
                                key={stat.stat.name + i} 
                                style={{flexDirection: 'row'}}
                            >
                                <Text 
                                    style={{
                                        ...style.regularText,
                                        width: 150
                                    }}
                                >
                                    { stat.stat.name }
                                </Text>
                                <Text 
                                    style={{
                                        ...style.regularText,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    { stat.base_stat }
                                </Text>
                            </View>
                        ))
                    }
                </View>

                {/* Sprite final  */}

                <View style={{
                    alignItems: 'center',
                    marginBottom: 60
                }}>
                    <FadeInImage 
                        uri={pokemon.sprites.front_default}
                        style={style.basicSprite}
                    />
                </View>

            </View>

        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20
    },
    regularText: {
        color: 'black',
        fontSize: 19
    },
    basicSprite: {
        width: 100,
        height: 100
    }
})
