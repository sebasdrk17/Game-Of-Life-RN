/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState } from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import produce from 'immer';

const num_rows = 10;
const num_cols = 10;

const App: () => React$Node = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < num_rows; i++) {
      rows.push(Array.from(Array(num_cols), () => 0));
    }
    return rows;
  });
  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      marginLeft: 5,
      marginTop: 5
    }}>
      {grid.map((rows, row_index) => rows.map((col, col_index) =>
        <TouchableHighlight
          key={`${row_index}-${col_index}`}
          onPress={() => {
            const new_grid = produce(grid, grid_copy => {
              grid_copy[row_index][col_index] = grid[row_index][col_index] ? 0 : 1;
            });
            setGrid(new_grid);
          }}
        >
          <Cell row_index={row_index} col_index={col_index} grid={grid}></Cell>
        </TouchableHighlight>
      ))
      }
       <TouchableOpacity style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Start</Text>
      </TouchableOpacity>

    </View>
  );
};

const Cell = (props) => {
  const grid = props.grid;
  let status = grid[props.row_index][props.col_index];
  return (
    <View
      style={{
        width: 35,
        height: 35,
        borderWidth: 1,
        backgroundColor: status ? "#70e000" : "darkslategrey"
      }}>
    </View>
  );
}

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    backgroundColor: "#70e000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginTop: 100,
    marginLeft: 50,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
export default App;
