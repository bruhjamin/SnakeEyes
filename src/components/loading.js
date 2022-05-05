import React, { useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native';
import Colors from "../constants/Colors";

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue:  0,
                    duration: 10,
                    useNativeDriver: false
                }),
                Animated.timing(fadeAnim, {
                    toValue:  0,
                    duration: 1000 * (4 - props.to),
                    useNativeDriver: false
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 10,
                    useNativeDriver: false
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000 * (props.to),
                    useNativeDriver: false
                })
            ])
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: fadeAnim
            }}
        >
            {props.children}
        </Animated.View>
    );
}

export default function Loading() {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}> 
                <Text style={styles.text}> Loading </Text>
                <FadeInView to={3}>
                    <Text style={styles.text}> . </Text>
                </FadeInView>
                <FadeInView to={2}>
                    <Text style={styles.text}> . </Text>
                </FadeInView>
                <FadeInView to={1}>
                    <Text style={styles.text}> . </Text>
                </FadeInView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: Colors.dark
    },
    text: {
        color: Colors.darkText,
        fontSize: 20
    },
});