import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GlobalStyles } from '../style/globalStyles';
import { FontSize } from '../style/fontSize';
import { Colors } from '../style/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import database, { firebase } from '@react-native-firebase/database'
import TextInputComponent from '../component/TextInput';
import Icons from 'react-native-vector-icons/FontAwesome';

//for push data in database
// let addItem = item => {
//     if (item.trim()) {
//         database().ref('/items').push({
//             name: item
//         })
//         alert(`${item} Item Saved Successfully`)
//     } else {
//         alert('Please Enter Data')
//     }
// }

//for Fetch Data from Database
let itemsRef = database().ref().child('users/')

const FirebaseDemo = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [emailId, setEmailId] = useState('')
    const [itemsArray, setItemArray] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editingText, setEditingText] = useState('')

    // const handleAddItem = () => {
    //     addItem(text)

    // }

    let addUserData = (email, fname, lname) => {

        console.log({ itemsArray })
        if (emailId.trim() && fname.trim() && lname.trim()) {

            firebase.database().ref('/users').push({
                fname: fname,
                lname: lname,
                email: email,
            }).then((data) => {
                console.log('data', data)
            })
            alert(`${fname} Item Saved Successfully`)
            setFname('')
            setLname('')
            setEmailId('')
        } else {
            alert('Please Eter Details')
        }
    }

    useEffect(() => {
        console.log({ itemsRef })
        itemsRef.on('value', snapshot => {
            let data = snapshot.val() || 0
            const items = Object.values(data)
            setItemArray(items)
        })
    }, [])

    const removeData = (key) => {
        let query = firebase.database().ref('/users')
        query.once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                let pkey = childSnapshot.key;
                let value = childSnapshot.val();

                console.log({ pkey })
                console.log({ value })

                if (value.fname == key.fname && value.lname == key.lname) {
                    firebase.database().ref().child('users/' + pkey).remove()
                    return true
                }
            })
        })
    }

    const EditData = (item) => {
        setIsEdit(true)
        setFname(item.fname)
        setLname(item.lname)
        setEmailId(item.email)
        setEditingText(item.fname)
    }

    const updateData = (item) => {

        firebase.database().ref('/users')
            .once('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    let key = childSnapshot.key;
                    let value = childSnapshot.val()
                    console.log('update', { key, value })
                    if (value.fname == item) {

                        firebase.database().ref('users/' + key).update({
                            fname: fname
                        })
                        return true
                    }
                })
            })
        setIsEdit(false)
        setFname('')
        setLname('')
        setEmailId('')
    }

    console.log('hhhh ---- ', fname)
    console.log('gggg ---- ', editingText)

    return (
        <SafeAreaView style={{ flex: 1, ...GlobalStyles.backgroundColor }}>

            <View style={styles.container}>
                <Text style={styles.title}>Add Item</Text>
                <TextInputComponent
                    placeholder={'Enter First Name'}
                    color={Colors.Black}
                    onChangeText={text => setFname(text)}
                    width={wp(80)}
                    value={fname}
                />
                <TextInputComponent
                    placeholder={'Enter Last Name'}
                    color={Colors.Black}
                    onChangeText={text => setLname(text)}
                    width={wp(80)}
                    value={lname}
                />
                <TextInputComponent
                    placeholder={'Enter Email'}
                    color={Colors.Black}
                    onChangeText={text => setEmailId(text)}
                    width={wp(80)}
                    value={emailId}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => { isEdit ? updateData(editingText) : addUserData(emailId, fname, lname) }}>
                    <Text style={styles.buttonTitle}>{isEdit ? 'update Item' : 'Add Item'}</Text>
                </TouchableOpacity>
                <Text style={[styles.title, { alignSelf: 'flex-start', ...GlobalStyles.marginLeft }]}>Fetch Data : </Text>
                <FlatList
                    data={itemsArray}
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <View style={styles.dataView}>
                                <Text style={styles.data}>First Name: {item.fname}</Text>
                                <Text style={styles.data}>Last Name: {item.lname}</Text>
                                <Text style={styles.data}>Email Id: {item.email}</Text>
                            </View>
                            <Icons
                                name='pencil'
                                size={20}
                                onPress={() => EditData(item, index)}
                            />
                            <Icons
                                name='remove'
                                size={20}
                                color={Colors.LightGreen}
                                onPress={() => removeData(item)}
                            />
                        </View>

                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default FirebaseDemo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    title: {
        fontSize: FontSize.fontsize_24,
        marginBottom: hp(3),
        alignSelf: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.Black,
        width: wp(80),
        borderRadius: wp(2),
        fontSize: FontSize.fontsize_20,
        padding: wp(2)
    },
    addButton: {
        backgroundColor: Colors.LightGreen,
        width: wp(80),
        margin: wp(5),
        alignItems: 'center',
        padding: wp(3),
        borderRadius: wp(2),
        alignSelf: 'center'
    },
    buttonTitle: {
        color: Colors.White,
        fontSize: FontSize.fontsize_18
    },
    data: {
        fontSize: FontSize.fontsize_16,
        // textAlign: 'center',
    },
    dataView: {
        borderWidth: 1,
        margin: wp(1),
        width: wp(70),
        padding: wp(2),
        borderRadius: wp(2)
    },
    row: {
        flexDirection: 'row',
        // marginRight: wp(0),
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})