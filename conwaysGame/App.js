/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState } from 'react';
import ButtonStack from "./ButtonStack";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import produce from 'immer';

const width = Dimensions.get("screen").width;
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
      flexWrap: "wrap"
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

    <View style={{
      marginTop: 40,
      marginLeft: 13
    }}>
      <ButtonStack/>
    </View>

    </View>
  );
};

const Cell = (props) => {
  const grid = props.grid;
  let status = grid[props.row_index][props.col_index];
  return (
    <View
      style={{
        width: width * .10,
        height: 35,
        borderWidth: 1,
        backgroundColor: status ? "#38b000" : "darkslategrey"
      }}>
    </View>
  );
}

export default App;
