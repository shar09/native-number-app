import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [ inputValue, setInputValue ] = useState('');
    const [ confirmInput, setConfirmInput ] = useState(false);
    const [ selectedNumber, setSelectedNumber ] = useState(null);

    const handleChange = inputText => {  
        setInputValue(inputText.replace(/[^0-9]/g, ''));
    }

    const handleReset = () => {
        setInputValue('');
        setConfirmInput(false);
    }

    const handleSubmit = () => {
        const chosenNumber = parseInt(inputValue);

        if (isNaN(chosenNumber) || inputValue > 99 || inputValue <= 0) {
            Alert.alert('Invalid Number!', 
            'Enter a number between 1 and 99', 
            [{ button: 'Okay', style: 'destructive', onPress: handleReset }]
            );
            return;
        }

        setConfirmInput(true);
        setInputValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }

    let confirmedNumber;

    if (confirmInput) {
        confirmedNumber = (
            <Card style={styles.summaryContainer}>
                <Text> You Chose </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.setUserChoice(selectedNumber)} />
            </Card>
            
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a number</Text>
                    <Input 
                        style={styles.input} 
                        blurOnSubmit
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={2}
                        onChangeText={handleChange}
                        value={inputValue}
                    />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" color={Colors.accent} onPress={handleReset} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" color={Colors.primary} onPress={handleSubmit} />
                        </View>
                    </View>
                </Card>
                {confirmedNumber}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        marginVertical: 10,
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;