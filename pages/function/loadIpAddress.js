import AsyncStorage from '@react-native-async-storage/async-storage'

const loadIpAddress = async () => {
  try {
    const ipAddress = await AsyncStorage.getItem('ipAddress')
    if (ipAddress !== null) {
      return ipAddress
    }
  } catch (error) {
    console.error(error)
  }
}

export default loadIpAddress
