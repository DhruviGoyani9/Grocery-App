import React, { useState, useEffect } from 'react'
import { FlatList, TextInput } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Colors } from '../style/color'
import Icons from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../redux/store/CounterStore'
import { addTodoAction, removeTodoAction, updateTodoAction } from '../redux/actions/TodoAction'
import { FontSize } from '../style/fontSize'
import axios from 'axios'
import { getDataAction } from '../redux/actions/ApiCallAction'

const TodoApp = () => {

    const [text, setText] = useState('');
    const [isEdit, setIsEdit] = useState(false)
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);

    const dispatch = useDispatch();

    const data = useSelector((state) => state)
    console.log({ data })

    const todos = data.todos.todos;
    console.log({ todos })


    const state = store.getState();
    console.log({ state })

    const addTodo = () => {
        if (text.trim())
            if (todos && !todos.includes(text)) {
                dispatch(addTodoAction(text))
                setText('')
            }
            else {
                alert(`${text} already added in TODO List`)
            }
        else
            alert('Please Enter Task')
        setIsEdit(false)
    }

    const removeTodo = item => {
        const todoIndex = todos.indexOf(item);
        if (todoIndex !== -1) {
            dispatch(removeTodoAction(item))
        } else {
            alert(`${text} is not in the TODO List`)
        }
    }

    const editTodo = (item, id) => {
        setIsEdit(true)
        setText(item)
        setEditingTaskIndex(id)
    }

    const updateTodo = (task) => {
        dispatch(updateTodoAction({ id: editingTaskIndex, task: task }))
        setIsEdit(false)
        setText('')
        console.log('update ')
    }

    const handleAddTask = () => {
        if (isEdit) {
            updateTodo(text)
        }
        else
            addTodo()
    }
    const renderTodoList = () => {
        return (
            <FlatList
                data={todos}
                renderItem={({ item, index }) => (
                    <View style={{}}>
                        <Text style={{ fontSize: FontSize.fontsize_20 }}>{item}</Text>
                        <Icons
                            name='pencil'
                            size={20}
                            onPress={() => editTodo(item, index)}
                        />
                        <Icons
                            name='remove'
                            size={20}
                            onPress={() => removeTodo(item)}
                        />
                    </View>
                )}
            />
        )
    }

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => dispatch(getDataAction(data)))
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.addTaskView}>
                <TextInput
                    value={text}
                    onChangeText={(text) => setText(text)}
                    numberOfLines={1}
                    multiline={false}
                    placeholder='ADD TASK'
                    placeholderTextColor={Colors.Black_18}
                    style={styles.textInput}
                />
                <Icons
                    name={isEdit ? 'pencil' : 'plus'}
                    size={20}
                    color={Colors.LightGreen}
                    onPress={() => handleAddTask()}
                />
            </View>

            <View style={{ marginTop: hp(2) }}>
                <Text style={styles.todoListText}>TODO LIST</Text>
                {renderTodoList()}
            </View>

        </View>
    )
}

export default TodoApp;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addTaskView: {
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
    todoListText: {
        marginHorizontal: wp(10),
        marginBottom: hp(2),
        fontSize: FontSize.fontsize_24
    },
    todoList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp(10)
    }
})