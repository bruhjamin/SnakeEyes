import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Colors from '../../../../constants/Colors';

const width = Dimensions.get('window').width - 80;

/*
    Display the player asset
    This is kinda useless rn 
*/
export default function Player() {
    return (
        // Temporary measure for before I add assets
        <View style={styles.player}>
            <Text>missing image</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        backgroundColor: Colors.light,
        width: width / 4,
        height: width / 4,
        borderRadius: 5,
        padding: width / 32,
    },
});
