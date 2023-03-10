import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { toolkitStore } from '../redux/store/ToolkitStore'
import { decrement, increment, incrementByAmount } from '../redux/reducers/CounterSlice'
import { Colors } from '../style/color';
import { FontSize } from '../style/fontSize'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AddTodo, removeTodo, updateTodo } from '../redux/reducers/TodoSlice'
import Icons from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from '../style/globalStyles';
import { FlatList } from 'react-native'

const CounterApp = () => {

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState('2')
    return (
        <SafeAreaView >
            <View>
                <View style={styles.counterView}>
                    <TouchableOpacity onPress={() => dispatch(increment())}>
                        <Text style={styles.counterButton}>+</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: FontSize.fontsize_20, fontWeight: 'bold' }}>{count}</Text>
                    <TouchableOpacity onPress={() => dispatch(decrement())}>
                        <Text style={styles.counterButton}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.counterView}>
                    <TextInput
                        value={incrementAmount}
                        onChangeText={(text) => setIncrementAmount(text)}
                        style={[styles.counterButton, { color: Colors.Black_18, fontSize: FontSize.fontsize_20 }]}
                    />
                    <TouchableOpacity onPress={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
                        <Text style={[styles.counterButton, { fontSize: FontSize.fontsize_16, color: Colors.Black_18 }]}>IncrementByAmount</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

const ToDoApp = () => {

    const [text, setText] = useState('')
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false)
    const [editingTaskIndex, setEditingTaskIndex] = useState(null)

    const todos = useSelector((state) => state.todos.todos)
    console.log({ todos })

    const count = useSelector((state) => state.todos.count)
    console.log({ count })

    const AddTask = () => {
        if (text.trim())
            if (todos && !todos.includes(text)) {
                dispatch(AddTodo(text))
                console.log('payload')
                setText('')
                console.log('add')
            }
            else {
                alert(`${text} already added in TODO List`)
            }
        else
            alert('Please Enter Task')
        setIsEdit(false)
    }

    const RemoveTodo = (item) => {
        dispatch(removeTodo(item))
    }

    const editTodo = (item, id) => {
        setIsEdit(true)
        setText(item)
        setEditingTaskIndex(id)
    }

    console.log({ editingTaskIndex })

    console.log({ text })
    const UpdateTodo = (task) => {
        dispatch(updateTodo({ id: editingTaskIndex, task: task }))
        setIsEdit(false)
        setText('')
    }
    return (
        <View>
            <View style={styles.todoInput}>
                <TextInput
                    value={text}
                    onChangeText={(text) => setText(text)}
                    numberOfLines={1}
                    multiline={false}
                    placeholder='ADD TASK'
                    placeholderTextColor={Colors.Black_18}
                    style={styles.textInput} />
                <Icons
                    name={isEdit ? 'pencil' : 'plus'}
                    size={20}
                    color={Colors.LightGreen}
                    onPress={() => isEdit ? UpdateTodo(text) : AddTask()}
                />
            </View>
            <View style={{ marginLeft: wp(10), marginTop: hp(2) }}>
                <Text style={{ fontSize: FontSize.fontsize_18 }}>ToDo List</Text>
                {count === 0 ?
                    <Text style={styles.noTask}>NO TASK</Text> :
                    <FlatList
                        data={todos}
                        renderItem={({ item, index }) => (
                            <View style={styles.todoList}>
                                <Text
                                    key={item.id}
                                    style={{
                                        fontSize: FontSize.fontsize_16,
                                        margin: 4
                                    }}>
                                    {` ${index + 1}. ${item} `}</Text>
                                <Icons
                                    name='pencil'
                                    size={20}
                                    onPress={() => editTodo(item, index)}
                                />
                                <Icons
                                    name='remove'
                                    size={20}
                                    onPress={() => RemoveTodo(item)}
                                />
                            </View>
                        )}
                    />
                }
            </View>
        </View>
    )
}
const ReduxToolkit = () => {
    return (
        <View style={{ ...GlobalStyles.backgroundColor, flex: 1, alignItems: 'center' }}>
            <Provider store={toolkitStore}>
                <CounterApp />
                <ToDoApp />
            </Provider>
        </View>
    )
}

export default ReduxToolkit

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    counterButton: {
        color: Colors.LightGreen,
        fontSize: FontSize.fontsize_25,
        borderWidth: 1,
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        borderRadius: 15,
        borderColor: Colors.LightGreen,
        margin: wp(5),
        textAlign: 'center'
    },
    todoInput: {
        flexDirection: 'row',
        marginHorizontal: wp(10),
        borderWidth: 1,
        borderColor: Colors.DarkGrey,
        width: wp(90),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textInput: {
        backgroundColor: Colors.LightGrey,
        height: hp(6),
        padding: 5,
        width: wp(80)
    },
    todoList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: wp(10)
    },
    noTask: {
        fontSize: FontSize.fontsize_20,
        textAlign: 'center'
    },
    counterView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})