import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props {
    onDebounce: (value: string ) => void,
    style? : StyleProp<ViewStyle>
}

export const SearchInput = ( { style, onDebounce } : Props ) => {

    const [textValue, setTextValue] = useState('')

    const debouncedValue = useDebouncedValue( textValue, 1000)

    useEffect(() => {
        // console.log({debouncedValue});
        onDebounce(debouncedValue)
    }, [debouncedValue])

    return (
        <View style={ {
            ...stylee.container,
            ...style as any
        } }>
            <View style={ stylee.textBackground }>

                <TextInput
                    placeholder='Buscar pokemon'
                    placeholderTextColor='#666666'                    
                    style={ stylee.textInput }
                    autoCapitalize='none'
                    autoCorrect={ false }

                    value={ textValue }
                    onChangeText={ setTextValue }
                />

                <Icon 
                    name='search-outline'
                    size={30}
                    color='#666666'
                />

            </View>
        </View>
    )
}


const stylee = StyleSheet.create({
    container: {
        marginBottom: 15
    },
    textBackground: {
        backgroundColor: '#f3f1f3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        textShadowRadius: 3.84,

        elevation: 5
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        top: 3,
        color: '#000'
    }
})
