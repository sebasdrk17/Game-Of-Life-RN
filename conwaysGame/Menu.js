import React, {useState, useRef, useCallback} from 'react';
import Grid from './Grid';
import {
  View,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const width = Dimensions.get('screen').width;

const Cell = (props) => {
  const grid = props.grid;
  let status = grid[props.row_index][props.col_index];
  return (
    <View
      style={{
        width: width * 0.1,
        height: 35,
        borderWidth: 1,
        backgroundColor: status ? '#38b000' : 'darkslategrey',
      }}
    />
  );
};

const App = () => {
  const [running, setRunning] = useState(false);
  const [start, setStart] = useState(false);
  const [autoGame, setAutoGame] = useState(false);

  const [grid, setGrid] = useState(() => {
    return Grid.createEmptyGrid();
  });

  const showBtn = start ? {display: 'flex'} : {};

  const running_ref = useRef(running);
  running_ref.current = running;

  const startGame = useCallback(() => {
    if (!running_ref.current) {
      return;
    }
    setGrid((current_grid) => Grid.startGame(current_grid));
    setTimeout(startGame, 100);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.celdsContainer}>
        {grid.map((rows, row_index) =>
          rows.map((col, col_index) => (
            <TouchableHighlight
              key={`${row_index}-${col_index}`}
              onPress={() => {
                setGrid(Grid.mutateGrid(grid, row_index, col_index));
              }}>
              <Cell row_index={row_index} col_index={col_index} grid={grid} />
            </TouchableHighlight>
          )),
        )}
      </View>
      <View style={styles.btnsContainer}>
        {/* start */}
        <TouchableOpacity
          onPress={() => {
            setStart(!start);
          }}
          style={[
            styles.button,
            {display: 'flex'},
            start ? {display: 'none'} : {},
          ]}>
          <Text style={{color: '#fff', fontSize: 20}}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, showBtn]}
          disabled={autoGame}
          onPress={() => {
            setRunning(true);
            if (!running) {
              running_ref.current = true;
              startGame();
              setRunning(false);
              running_ref.current = false;
            }
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, showBtn]}
          onPress={() => {
            setAutoGame(!autoGame);
            setRunning(true);
            if (!running) {
              running_ref.current = true;
              startGame();
            }
          }}>
          <Text style={styles.textBtns}>Auto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, showBtn]}
          disabled={autoGame}
          onPress={() => setGrid(Grid.createEmptyGrid())}>
          <Text style={styles.textBtns}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            setRunning(false);
            running_ref.current = false;
          }}
          disabled={start}>
          <Text style={styles.textBtns}>Stop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  celdsContainer: {
    flex: 1.1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  button: {
    display: 'none',
    height: 50,
    width: width * 0.9,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#38b000',
  },
  textBtns: {
    color: '#fff',
    fontSize: 20,
  },
});

export default App;
