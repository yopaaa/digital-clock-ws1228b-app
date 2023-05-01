import { Alert } from 'react-native'

const alertJson = (title = 'alert', object = {}) => {
  return Alert.alert(
    title,
    JSON.stringify(object, null, 5),
    [
      {
        text: 'OK'
      }
    ],
    {
      cancelable: true
    }
  )
}

export default alertJson
