import { useEffect } from "react"
import PushNotification from "react-native-push-notification"
import PushNotificationIOS from '@react-native-community/push-notification-ios'

const RemotePushController = () => {
    useEffect(() => {
        PushNotification.createChannel({
            channelId: 'channel-id-1',
            channelName: 'my channel',
            channelDescription: 'A Channel for Description',
            playSound: true,
            soundName: 'default',
            importance: 10,
            vibrate: true,
            vibration: 1000,
        }, (created) => console.log(`channel created in remotepush controller -- ${created}`))


        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN = ", token)
                alert(`TOKEN =  ${JSON.stringify(token)}`)
            },

            onNotification: function (notification) {
                console.log("Remote Controller = ", notification)
                alert(JSON.stringify(notification))

                PushNotification.localNotification({
                    message: notification.message,
                    channelId: 'channel-id-1',
                    title: notification.title,
                    playSound: true,
                    soundName: 'default',
                    importance: 10,
                    vibrate: true,
                    vibration: 1000,
                    channelName: 'my channel',
                    autoCancel: true,
                })
                // notification.finish(PushNotificationIOS.FetchResult.NoData)
            },
            senderID: '669604741129',
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true
        })


    })
    return null
}

export default RemotePushController