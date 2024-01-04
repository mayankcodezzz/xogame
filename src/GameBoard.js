// src/GameBoard.js
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

const initialBoard = Array(9).fill(null);

const gameboard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = squares => {
    // Possible winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = index => {
    // Check if the square is already filled or if there's a winner
    if (board[index] || calculateWinner(board)) {
      return;
    }

    // Create a copy of the board array to modify
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    // Update the board and set the next player
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = index => (
    <TouchableOpacity style={styles.square} onPress={() => handleClick(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const getStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(square => square)) {
      return "It's a draw!";
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  useEffect(() => {
    // Check for a winner after each move
    const winner = calculateWinner(board);
    if (winner) {
      Alert.alert(`Winner: ${winner}`, 'Game Over', [{text: 'OK'}]);
    }
  }, [board]);

  return (
    <View style={styles.board}>
      <Text style={styles.status}>{getStatus()}</Text>
      <View style={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 24,
  },
  status: {
    marginBottom: 10,
    fontSize: 18,
  },
});

export default gameboard;
