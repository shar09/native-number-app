import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userChoice, setUserChoice] = useState(null);
  const [rounds, setRounds] = useState(0);
  
  const configureHandler = () => {
    setRounds(0);
    setUserChoice(null);
  }

  const startGameHandler = selectedNumber => {
    setUserChoice(selectedNumber);
  }

  const gameOverHandler = numOfRounds => {
    setRounds(numOfRounds);
  }

  let content;

  if(userChoice) {
    if(rounds > 0) 
      content = <GameOverScreen rounds={rounds} userChoice={userChoice} restart={configureHandler} />  
    else
      content = <GameScreen userChoice={userChoice} gameOver={gameOverHandler} />
  } else {
    content = <StartGameScreen setUserChoice={startGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
