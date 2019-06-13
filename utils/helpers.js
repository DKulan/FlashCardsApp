import {AsyncStorage} from 'react-native'
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'FlashCardsApp:notifications'


const createNotification = () => ({
  title: "study today!",
  body: "Don't forget to study for today!",
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
})

const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(createNotification(), {
                time: tomorrow,
                repeat: 'day'
              })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export {clearLocalNotification, setLocalNotification}