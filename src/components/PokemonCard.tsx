import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width

interface Props {
    pokemon: SimplePokemon
}

export const PokemonCard = ({pokemon} : Props) => {

    const [bgColor, setbgColor] = useState('grey')
    const isMounted = useRef(true)
    const navigation = useNavigation()

    useEffect(() => {

        ImageColors.getColors(pokemon.picture, {fallback: 'grey'})
            .then( colors => { 

                if( !isMounted.current ) return
                
                if( colors.platform === 'android' ){
                    setbgColor(colors.dominant || 'grey')
                }
                else if(colors.platform === 'ios'){
                    setbgColor(colors.background || 'grey')
                }
            })

        return () => {
            isMounted.current = false
        }

    }, [])

  return (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={ 
            () =>  navigation.navigate('PokemonScreen', { 
                simplePokemon: pokemon,
                color: bgColor
            }) 
        }
    >
        <View 
            style={{
                ...style.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}
        >
            {/* Nombre del pokemon y ID */}
            <View>
                <Text style={{...style.name}}>
                    {pokemon.name}
                    { '\n#' + pokemon.id}
                </Text>
            </View>

            <View style={style.pokebolaContainer}>
                <Image 
                    source={ require('../assets/pokebola-blanca.png') }
                    style={style.pokebola}
                />
            </View>

            <FadeInImage 
                uri={ pokemon.picture }
                style={style.pokemonImage}

            />
            
        </View>   


    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 120,
        width: 150,
        marginBottom: 25, 
        borderRadius: 10,
        // Sombra
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 12,
        left: 10,
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25,
    },
    pokemonImage:{
        width: 110,
        height: 110,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        // backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5,
    }
})
