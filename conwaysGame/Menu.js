import React, { useState, useRef, useCallback } from 'react';
import Grid from './Grid'

import {
    View,
    TouchableHighlight,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const width = Dimensions.get("screen").width;

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


const App: () => React$Node = () => {
    const [grid, setGrid] = useState(() => {
        return Grid.createEmptyGrid();
    });

    const [running, setRunning] = useState(false);
    const running_ref = useRef(running);
    running_ref.current = running;

    const startGame = useCallback(() => {
        if (!running_ref.current) return;
        setGrid(current_grid => Grid.startGame(current_grid));
        setTimeout(startGame, 100);
    }, []);

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
                        setGrid(Grid.mutateGrid(grid, row_index, col_index));
                    }}
                >
                    <Cell row_index={row_index} col_index={col_index} grid={grid} />
                </TouchableHighlight>
            ))
            }

            <View style={{
                marginTop: 40,
                marginLeft: 13
            }}>
                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>Start</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: width * 0.9,
                            justifyContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            backgroundColor: "#38b000"
                        }}
                        onPress={() => {
                            setRunning(true);
                            if (!running) {
                                running_ref.current = true;
                                startGame();
                                setRunning(false);
                                running_ref.current = false;
                            }
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setRunning(true);
                            if (!running) {
                                running_ref.current = true;
                                startGame();
                            }
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>Auto</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setGrid(Grid.createEmptyGrid())}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setRunning(false);
                            running_ref.current = false;
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>Stop</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 10
    },
    button: {
        height: 50,
        width: width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#38b000"
    }
});

export default App;