import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onNotification: function (notification) {
        console.log('Local Notification', notification)
    },
    popInitialNotification: true,
    requestPermissions: true
})

PushNotification.createChannel({
    channelId: 'channel-id-1',
    channelName: 'my channel',
    channelDescription: 'A Channel for Description',
    playSound: true,
    soundName: 'default',
    importance: 10,
    vibrate: true,
    vibration: 1000,
}, (created) => console.log(`channel created ${created}`))

export const LocalNotification = () => {
    PushNotification.localNotification({
        channelId: 'channel-id-1',
        channelName: 'my channel',
        autoCancel: true,
        bigText: 'This is local notification demo from reactnative and it is expanded',
        subText: 'Local Notification Demo',
        title: 'Local Notification Title',
        message: 'I am a Message',
        playSound: true,
        soundName: 'default',
        importance: 10,
        vibrate: true,
        vibration: 1000,
    })
}