/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableHighlight
} from 'react-native';

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
          onPress={() => console.log('does not work')}
        >
          <View

            //key, cada celula debe de tener una key, podriamos definirla en la clase
            // no es ideal que la key sea el index de row o col
            key={`${row_index}-${col_index}`}
            style={{
              width: 39.26,
              height: 39.26,
              borderWidth: 1,
              //aqui tendriamos que cambiar la comparacion, en este caso si existe lo hace verde, si no, gris oscuro
              //podriamos hacerlo referenciando al objeto con un "this" o algo similar
              backgroundColor: grid[row_index][col_index] ? "chartreuse" : "darkslategrey"
            }}>
          </View>
        </TouchableHighlight>
      ))
      }
    </View>
  );
};

export default App;
