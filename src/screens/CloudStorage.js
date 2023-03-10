import { ActivityIndicator, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ReusableButton } from '../component/Button'
import { GlobalStyles } from '../style/globalStyles'
import storage from '@react-native-firebase/storage'
import DocumentPicker from 'react-native-document-picker'
import { Colors } from '../style/color'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import Video from 'react-native-video';
import Video from 'react-native-video';


const CloudStorage = () => {

    const [filePath, setFilePath] = useState([]);
    const [process, setProcess] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const chooseFile = async () => {
        try {
            const fileDetails = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                copyTo: 'cachesDirectory'
            })
            console.log("File Details : " + JSON.stringify(fileDetails))
            // console.log('22----> ', fileDetails)
            setFilePath(fileDetails[0])
        } catch (error) {
            setFilePath({})
            console.log({ error })
            alert(
                DocumentPicker.isCancel(error) ? "Canceled" : 'Unknown Error: ' + JSON.stringify(error)
            )
        }
    }

    console.log('file : ---> ', filePath)

    const uploadFile = async () => {
        try {
            if (Object.keys(filePath).length == 0)
                return alert("Please Select any File")

            console.log('----', filePath.fileCopyUri.replace("file://", ""))
            console.log('name -->', filePath.name)

            const reference = storage().ref(`/myfiles/${filePath.name}`)
            const task = reference.putFile(filePath.fileCopyUri.replace("file://", ""))

            task.on("state_changed", (taskSnapshot) => {
                setProcess(
                    `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
                )
                console.log(`${taskSnapshot.bytesTransferred} tranferred out of ${taskSnapshot.totalBytes}`)
            })
            task.then(() => {
                alert("Image Upload to the bucket!")
                setProcess("")
            })
            // setFilePath({})
        } catch (error) {
            console.log("Error -> ", error)
            alert(`Error -> ${error}`)
        }
    }

    console.log('url ----> ', filePath.fileCopyUri)
    console.log(imageUrl)
    const retriveFile = () => {
        let imageRef = storage().ref(`/myfiles/${filePath.name}`)

        console.log({ imageRef })
        imageRef.getDownloadURL().then((url) => {
            setImageUrl(url)
        }).catch((error) => alert(`Error While Downloading ${error}`))
    }

    // const converter = () => {
    //     const filename = Date.now().toString();
    //     MovToMp4.convertMovToMp4(imageUrl, filename + "mp4").then((result) => console.log({ result }))
    // }

    // const convertMovtoMp4 = async () => {
    //     await FS
    //     // await RNFFmpeg.execute(`-i  -c copy output.mp4`)
    //     //     .then(result => console.log(`FFmpeg proccess exited with rc = ${result}`))
    // }

    // useEffect(() => {

    //     const movFile = filePath.fileCopyUri
    //     console.log('mov file --> ', movFile)

    //     const filename = Date.now().toString()
    //     MovToMp4.convertMovToMp4(movFile, filename + '.mp4').then((result) => {
    //         console.log('result ---> ', result)
    //     }).catch(err => console.log({ err }))
    // }, [])

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView
                bounces={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(50), }}
            >

                <View>
                    <ReusableButton
                        onPress={chooseFile}
                        text={`ChooseImage ${Object.keys(filePath).length === 0 ? 0 : 1}`}
                    />
                    <ReusableButton
                        text={'Upload File'}
                        onPress={uploadFile}
                    />
                    <Text style={{ color: Colors.Black, textAlign: 'center' }}>{process}</Text>
                    <ReusableButton
                        text={'Retrive File'}
                        onPress={retriveFile}
                    />
                    <Text>{imageUrl}</Text>
                    {/* <TouchableOpacity onPress={() => converter()}>
                        <Text>Convert Mov to mp4</Text>
                    </TouchableOpacity> */}
                    <Image
                        style={{ width: wp(50), height: hp(50) }}
                        source={{ uri: filePath.fileCopyUri }}
                        resizeMode='contain'
                    />
                    <View style={{ height: hp(50), width: wp(50) }}>

                        <Video
                            source={{ uri: imageUrl }}
                            controls={true}

                            style={{ width: wp(50), height: hp(50), backgroundColor: 'red' }}
                            paused={false}
                            repeat={true}
                            resizeMode='contain'
                            onError={(error) => console.log('video error --> ', error)}

                        />
                        <Video />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>



    )
}

export default CloudStorage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.backgroundColor
    }
})