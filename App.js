// src/App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GameBoard from './src/GameBoard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tic Tac Toe" component={GameBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
