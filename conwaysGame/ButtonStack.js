import React,{useState} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'

const width = Dimensions.get("screen").width;

function StartButton({setPagination, pagination}) {

    return (
        <View
        style={styles.buttonContainer}
        >
            <TouchableOpacity 
                style={styles.button}
                onPress={() => setPagination(pagination + 1)}
            >
                <Text style={{color: "#fff", fontSize: 20}}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

function NextButton({setPagination, pagination, disabled}) {

    return (
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
                    backgroundColor: disabled ? "gray" : "#38b000"
                }}
                // onPress={() => setPagination(pagination + 1)}
                // disabled={disabled}
            >
                <Text style={{color: "#fff", fontSize: 20}}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

function AutoButton({setPagination, pagination}) {

    return (
        <View
            style={styles.buttonContainer}
        >
            <TouchableOpacity 
                style={styles.button}
                onPress={() => setPagination(pagination + 1)}
            >
                <Text style={{color: "#fff", fontSize: 20}}>Auto</Text>
            </TouchableOpacity>
        </View>
    )
}

function ResetButton({setPagination, pagination}) {

    return (
        <View
            style={styles.buttonContainer}
        >
            <TouchableOpacity 
                style={styles.button}
                onPress={() => setPagination(0)}
            >
                <Text style={{color: "#fff", fontSize: 20}}>Reset</Text>
            </TouchableOpacity>
        </View>
    )
}

function StopButton({setPagination, pagination}) {
    return (
        <View
            style={styles.buttonContainer}
        >
            <TouchableOpacity 
                style={styles.button}
                onPress={() => setPagination(pagination + 1)}
            >
                <Text style={{color: "#fff", fontSize: 20}}>Stop</Text>
            </TouchableOpacity>
        </View>
    )
}

function ContinueButton({setPagination, pagination}) {
    return (
        <View
            style={styles.buttonContainer}
        >
            <TouchableOpacity 
                style={styles.button}
                // onPress={() => setPagination(2)}
            >
                <Text style={{color: "#fff", fontSize: 20}}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

function renderButtons(pagination, setPagination) {
    if(pagination === 0){
        return <StartButton pagination={pagination} setPagination={setPagination}/>
    } else if (pagination === 1){
        return (
            <View>
                <NextButton pagination={pagination} setPagination={setPagination}/>
                <AutoButton pagination={pagination} setPagination={setPagination}/>
                <ResetButton pagination={pagination} setPagination={setPagination}/>
            </View>
        )
    } else if (pagination === 2) {
        return (
            <View>
                <NextButton pagination={pagination} setPagination={setPagination} disabled={true}/>
                <StopButton pagination={pagination} setPagination={setPagination}/>
            </View>
        )
    } else if (pagination === 3){
        return (
            <View>
                <NextButton pagination={pagination} setPagination={setPagination} disabled={true}/>
                <ContinueButton pagination={pagination} setPagination={setPagination}/>
                <ResetButton pagination={pagination} setPagination={setPagination}/>
            </View>
        )
    }
}

export default function ButtonStack() {
    const [pagination, setPagination] = useState(0);
    return (
        <View>
            {renderButtons(pagination, setPagination)}
        </View>
    )
}

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
})
