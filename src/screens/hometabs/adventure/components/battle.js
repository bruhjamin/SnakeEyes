import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { useSelector } from "react-redux";

import Colors from "../../../../constants/Colors";
import Player from "./player";
import HpBar from "./hpBar";
import Dice from "./dice";
import D6 from "../../../../components/dice6";
import { useRef } from "react";

export default function Battle({ enemy }) {
    const profile = useSelector((state)=> state.profile);
    const [battleOngoing, setBattleOngoing] = useState(0);
    const [currentHp, setCurrentHp] = useState(profile.hp * 5);
    const maxHp = profile.hp * 5;
    const [currentEnemyHp, setCurrentEnemyHp] = useState(enemy.hp * 5);
    const [doAttack, setDoAttack] = useState(false);
    const [playRoll, setPlayRoll] = useState(0);
    const [otherRoll, setOtherRoll] = useState(0);
    const [disableActions, setDisableActions] = useState(false);
    const timer = useRef(null);

    const attack = () => {
        setDisableActions(true);
        let playerA = Dice(6, 1);
        let enemyA = Dice(enemy.dice, 1);
        setPlayRoll(playerA);
        setOtherRoll(enemyA);
        setCurrentEnemyHp(currentEnemyHp - playerA);
        setCurrentHp(currentHp - enemyA);
        timer.current = setTimeout(() => setDisableActions(false), 200);
        setDoAttack(false);
    }

    useEffect(() => {
        if(currentHp <= 0){
            setCurrentHp(0);
            clearTimeout(timer.current);
            setDisableActions(true);
            setBattleOngoing(2);
        }
    }, [currentHp]);

    useEffect(() => {
        if(currentEnemyHp <= 0){
            setCurrentEnemyHp(0);
            clearTimeout(timer.current);
            setDisableActions(true);
            setBattleOngoing(1);
        }
    }, [currentEnemyHp]);

    useEffect(() => {
        if(doAttack){
            attack();
        }
    }, [doAttack])

    return (
        <View style={styles.gameContainer}>
            {battleOngoing === 0? 
                <View style={styles.displayContainer}>
                    <View style={styles.displayEnemy}>
                        <HpBar isUser={false} maxHp={enemy.hp * 5} currentHp={currentEnemyHp}/>
                        <View style={styles.playerContainer}> 
                            <D6 dots={otherRoll}/>
                            <Player attack={doAttack} rolled={otherRoll}/>
                        </View>
                    </View>
                    <View>
                        <Text >some text</Text>
                    </View>
                    <View style={styles.displayPlayer}>
                        <HpBar isUser={true} maxHp={maxHp} currentHp={currentHp}/>
                        <View style={styles.playerContainer}> 
                            <Player attack={doAttack} rolled={playRoll}/>
                            <D6 dots={playRoll}/>
                        </View>
                    </View>
                </View> 
                : 
                <View style={styles.displayContainer}>
                    {battleOngoing === 1 ? 
                        <Text>You beat the {enemy.name}</Text>
                        :
                        <Text>Try again next time :(</Text>
                    }
                </View>
            }
            <View style={styles.actionContainer}>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    disabled={disableActions}
                    onPress={()=> setDoAttack(true)}
                >
                    <Text style={styles.text}>Roll</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    disabled={disableActions}
                >
                    <Text style={styles.text}>Rest</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    style={styles.buttonContainer}
                    disabled={disableActions}
                >
                    <Text style={styles.text}>Items</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },     
    buttonContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    gameContainer: {
        flex: 1,
    },
    actionContainer: {
        flex: 1,
    },
    displayContainer: {
        flex: 2,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.light,
        padding: 20
    },
    playerContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    displayEnemy: {

    },
    displayPlayer: {
        justifyContent: 'flex-end'
    },
    text: {
        color: Colors.darkText,
        fontSize: 20
    },
});