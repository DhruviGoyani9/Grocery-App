import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontSize } from '../style/fontSize';
import { Colors } from '../style/color';
import { GlobalStyles } from '../style/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { store } from '../redux/store/CounterStore';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { increment, decrement } from '../redux/actions/CountActions';
import TodoApp from './TodoApp';

const CounterApp = () => {
    const dispatch = useDispatch()

    const count = useSelector((store) => store.count.count)
    const state = store.getState()
    console.log({ state })

    const handleIncrement = () => {
        dispatch(increment())
    }

    const handleDecrement = () => {
        dispatch(decrement())
    }

    const incrementIfOdd = () => {
        if (count % 2 !== 0) {
            console.log('fdg', store.getState().value)
            dispatch(increment())
        }
    }
    return (
        <View>

            <View style={{ flexDirection: 'row', width: wp(50), justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={handleIncrement}>
                    <Text style={styles.increment}>+</Text>
                </TouchableOpacity>
                <Text style={styles.increment}>{count}</Text>
                <TouchableOpacity onPress={handleDecrement}>
                    <Text style={styles.increment}>-</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={incrementIfOdd}>
                <Text style={[styles.increment, { color: Colors.LightGreen }]}>Increment IF Odd</Text>
            </TouchableOpacity>
        </View>
    )
}
const ReduxDemo = () => {

    return (
        <View style={styles.container}>
            <Provider store={store}>
                <CounterApp />
                <TodoApp />
            </Provider>
            {/* <Provider store={toolkitStore}>
                <CounterApp />
            </Provider> */}
        </View>
    )
}

export default ReduxDemo
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...GlobalStyles.backgroundColor
    },
    increment: {
        fontSize: FontSize.fontsize_24,
        color: Colors.Black_18
    }
})