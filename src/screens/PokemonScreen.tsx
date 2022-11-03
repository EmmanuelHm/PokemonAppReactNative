import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
4
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from '../navigation/Navigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { styles } from '../theme/AppTheme';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{}

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { simplePokemon, color } = route.params
    const { id, name, picture } = simplePokemon

    const { top } = useSafeAreaInsets()

    const { isLoading, pokemon } = usePokemon(id)
    console.log(pokemon);
    

    return (

        <View style={{flex: 1}}>
            {/* Header Container */}
            <View
                style={{
                    ...style.headerContainer,
                    backgroundColor: color,
                }}
            >
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => navigation.pop()  }
                    activeOpacity={0.8}
                    style={{
                        ...style.backButton,
                        top: top + 15
                    }}
                >
                    <Icon
                        name='arrow-back-outline'
                        color='white'
                        size={35}
                    />
                </TouchableOpacity>

                {/* Nombre de Pokemon */}
                <Text
                    style={{
                        ...style.pokemonName,
                        top: top + 50
                    }}
                >
                    { name + '\n' }#{ id }
                </Text>

                {/* Pokebola Blanca */}
                <Image
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ style.pokeball }
                />

                <FadeInImage
                    uri={picture}
                    style={style.pokemonImage}
                />  
                
            </View>

            {/* Detalles y Loading  */}

            {
                isLoading 
                ? (
                    <View style={ style.loadingIndicator }>
                        <ActivityIndicator
                            color={color}
                            size={50}
                        />
                    </View>
                )
                : <PokemonDetails pokemon={ pokemon }  />
            }

            



        </View>
    )
}

const style = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton:{
        position: 'absolute',
        left: 20,
    },
    pokemonName:{
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball:{
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute', 
        bottom: -15
    },
    loadingIndicator:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
})
