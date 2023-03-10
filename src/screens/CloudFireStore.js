import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import TextInputComponent from '../component/TextInput'
import { GlobalStyles } from '../style/globalStyles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ReusableButton } from '../component/Button'
import firestore from '@react-native-firebase/firestore'
import { FontSize } from '../style/fontSize'
import { Colors } from '../style/color'
import Icons from 'react-native-vector-icons/FontAwesome';

const CloudFireStore = () => {

    const [userName, setUserName] = useState('')
    const [userContact, setUserContact] = useState()
    const [userAge, setUserAge] = useState()
    const [listData, setListData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const ref = firestore().collection('Users')

    const AddUserData = () => {
        if (userName && userContact && userAge) {
            ref.add({
                name: userName,
                contact: userContact,
                age: userAge
            }).then(() => {
                alert('User Added Successfully')
            })
        } else {
            alert('Please Fill all the Details')
        }
        setUserName('')
        setUserContact('')
        setUserAge('')
    }

    console.log('list -- ', listData)

    useEffect(() => {
        ref.where('age', '>=', 18).orderBy('age', 'desc')
            .onSnapshot(query => {
                let temp = []
                query.forEach(snap => {
                    let userDetails = {}
                    userDetails = snap.data()
                    userDetails['id'] = snap.id
                    temp.push(userDetails)
                })
                setListData(temp)
            })
    }, [])

    const RemoveData = (id) => {
        ref.doc(id).delete().catch((error) => {
            alert(`Exception: ${error}`)
        })
    }

    const EditData = (item) => {
        console.log('item age', item.age)
        setUserName(item.name)
        setUserContact(String(item.contact))
        setUserAge(String(item.age))
        setEditingId(item.id)
        setIsEdit(true)
    }

    const updateData = () => {
        if (editingId && userName && userContact && userAge) {
            ref.doc(editingId).update({
                name: userName,
                contact: userContact,
                age: userAge,
            }).then(() => {
                alert('Upadate Successfully')
            })
        } else {
            alert('Please fill all fields')
        }
        setIsEdit(false)
        setUserName('')
        setUserContact('')
        setUserAge('')
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.container}>
                <TextInputComponent
                    placeholder={'Enter UserName'}
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                    width={wp(90)}
                />
                <TextInputComponent
                    placeholder={'Enter UserContact'}
                    value={userContact}
                    onChangeText={(text) => setUserContact(Number(text) || 0)}
                    width={wp(90)}
                    keyboardType={'numeric'}
                />
                <TextInputComponent
                    placeholder={'Enter User age'}
                    value={userAge}
                    onChangeText={(text) => setUserAge(Number(text) || 0)}
                    width={wp(90)}
                    keyboardType={'numeric'}
                />
                <ReusableButton
                    text={isEdit ? 'Update User' : 'Add User'}
                    onPress={isEdit ? updateData : AddUserData}
                />
                <View style={{ ...GlobalStyles.marginLeft, marginTop: hp(2) }}>
                    <Text style={{ fontSize: FontSize.fontsize_20 }}>Fetch Data</Text>
                    <FlatList
                        data={listData}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <View style={styles.dataView}>
                                    <Text>{item.id}</Text>
                                    <Text style={styles.data}>name: {item.name}</Text>
                                    <Text style={styles.data}>contact: {item.contact}</Text>
                                    <Text style={styles.data}>age: {item.age}</Text>
                                </View>
                                <Icons
                                    name='pencil'
                                    size={20}
                                    onPress={() => EditData(item)}
                                />
                                <Icons
                                    name='remove'
                                    size={20}
                                    color={Colors.LightGreen}
                                    onPress={() => RemoveData(item.id)}
                                />
                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView >
    )
}

export default CloudFireStore

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.backgroundColor
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
    },
    data: {
        fontSize: FontSize.fontsize_16,
        // textAlign: 'center',
    },
})