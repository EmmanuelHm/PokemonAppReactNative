import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export const Loading = () => {
    return (
        <View  style={style.activityContainer}>
            <ActivityIndicator
                size={50}
                color='grey'
            />
            <Text style={{color: 'grey'}}>Cargando...</Text>
        </View>
        
    )
}

const style =  StyleSheet.create({
    activityContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

