import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';

import Colors from '../../../../constants/Colors';
import Player from './player';
import HpBar from './hpBar';
import {Dice, Crit} from './dice';
import D6 from '../../../../components/dice6';

/*
    The entire combat system (currently)
*/
export default function Battle({enemy /* navigation */}) {
    const profile = useSelector(state => state.profile);
    const [currentHp, setCurrentHp] = useState(profile.hp * 5);
    const maxHp = profile.hp * 5;
    const [currentEnemyHp, setCurrentEnemyHp] = useState(enemy.hp * 5);
    const [doAttack, setDoAttack] = useState(false);
    const [playRoll, setPlayRoll] = useState(0);
    const [otherRoll, setOtherRoll] = useState(0);
    const [disableActions, setDisableActions] = useState(false);
    const [turnMessage, setTurnMessage] = useState('');
    const [doRest, setDoRest] = useState(false);

    /*
        See who rolls a higher number and then do damage 
        according to their strength stat and if they crit
    */
    const attack = () => {
        setDisableActions(true);
        let playerRoll = Dice(6, 1);
        let enemyRoll = Dice(enemy.dice, 1);
        let playerCrit = Crit(profile.luck);
        let enemyCrit = Crit(enemy.luck);

        if (playerRoll > enemyRoll) {
            let dmg = playerCrit ? profile.strength * 2 : profile.strength;
            setCurrentEnemyHp(currentEnemyHp - dmg);
            setTurnMessage(
                `You${playerCrit ? ' crit and' : ''} did ${dmg} damage`,
            );
        } else if (playerRoll < enemyRoll) {
            let dmg = enemyCrit ? enemy.strength * 2 : enemy.strength;
            setCurrentHp(currentHp - dmg);
            setTurnMessage(`${enemy.name} did ${dmg} damage`);
        } else if (playerRoll === enemyRoll) {
            setTurnMessage(`Your attack was parried`);
        }
        setPlayRoll(playerRoll);
        setOtherRoll(enemyRoll);
        setDisableActions(false);
        setDoAttack(false);
    };

    /*
        See who rolls a higher number and then heal 25% 
        of their hp or take 2 times more damage, factors in crit
    */
    const rest = () => {
        setDisableActions(true);
        let playerRoll = Dice(6, 1);
        let enemyRoll = Dice(enemy.dice, 1);
        let enemyCrit = Crit(enemy.luck);

        if (playerRoll > enemyRoll) {
            if (currentHp + maxHp / 4 > maxHp) {
                setTurnMessage(`You healed ${maxHp - currentHp} hit points`);
                setCurrentHp(maxHp);
            } else {
                setTurnMessage(
                    `You healed ${Math.ceil(currentHp + maxHp / 4)} hit points`,
                );
                setCurrentHp(Math.ceil(currentHp + maxHp / 4));
            }
        } else if (playerRoll < enemyRoll) {
            let dmg = enemyCrit ? enemy.strength * 4 : enemy.strength * 2;
            setCurrentHp(currentHp - dmg);
            setTurnMessage(`You were unarmed and took ${dmg} damage`);
        } else if (playerRoll === enemyRoll) {
            setTurnMessage(`Your rest was disturbed`);
        }

        setPlayRoll(playerRoll);
        setOtherRoll(enemyRoll);
        setDisableActions(false);
        setDoRest(false);
    };

    /*
        End the battle if either have no hp left
    */
    useEffect(() => {
        if (currentHp <= 0) {
            setCurrentHp(0);
            setDisableActions(true);
            setTurnMessage(`You beat the ${enemy.name}.`);
        }
    }, [currentHp]);

    useEffect(() => {
        if (currentEnemyHp <= 0) {
            setCurrentEnemyHp(0);
            setDisableActions(true);
            setTurnMessage(`You beat the ${enemy.name}.`);
        }
    }, [currentEnemyHp]);

    /*
        Wait for actions to update before calling the corresponding functions
    */
    useEffect(() => {
        if (doAttack) {
            attack();
        }
    }, [doAttack]);

    useEffect(() => {
        if (doRest) {
            rest();
        }
    }, [doRest]);

    return (
        <View style={styles.gameContainer}>
            <View style={styles.displayContainer}>
                <View style={styles.displayEnemy}>
                    <HpBar
                        isUser={false}
                        maxHp={enemy.hp * 5}
                        currentHp={currentEnemyHp}
                    />
                    <View style={styles.playerContainer}>
                        <D6 dots={otherRoll} />
                        <Player />
                    </View>
                </View>
                <View>
                    <Text>{turnMessage}</Text>
                </View>
                <View style={styles.displayPlayer}>
                    <HpBar isUser={true} maxHp={maxHp} currentHp={currentHp} />
                    <View style={styles.playerContainer}>
                        <Player />
                        <D6 dots={playRoll} />
                    </View>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    disabled={disableActions}
                    onPress={() => setDoAttack(true)}>
                    <Text style={styles.text}>Roll</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    disabled={disableActions}
                    onPress={() => setDoRest(true)}>
                    <Text style={styles.text}>Rest</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    disabled={disableActions}>
                    <Text style={styles.text}>Items</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        justifyContent: 'space-between',
        flexDirection: 'row',
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
        padding: 20,
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    displayEnemy: {},
    displayPlayer: {
        justifyContent: 'flex-end',
    },
    text: {
        color: Colors.darkText,
        fontSize: 20,
    },
});
