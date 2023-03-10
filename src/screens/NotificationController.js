import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
import messaging from '@react-native-firebase/messaging'

console.log("push notification ---")
PushNotification.createChannel({
    channelId: "channel-id-1",
    channelName: "My Channel",
    channelDescription: "A Channel to categories your notifications",
    playSound: false,
    soundName: "default",
    importance: 4,
    vibrate: true
}, (created) => console.log(`create channel returned ${created}`))
const NotificationController = () => {

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            PushNotification.localNotification({
                message: remoteMessage.notification.body,
                title: remoteMessage.notification.title,
                bigPictureUrl: remoteMessage.notification.android.imageUrl,
                channelId: true,
                vibrate: true
            })
        })
        return unsubscribe;
    })
    return null;
}

export default NotificationController

