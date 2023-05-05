import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import vars from './components/Vars'
import MyButton from './components/MyButton'
import axios from 'axios'
import alertJson from './function/alertJson'
import Loading from './components/Loading'
import loadIpAddress from './function/loadIpAddress'

const Setting = () => {
  const [netinfo, setnetinfo] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [ipAddress, setIpAddress] = useState('')
  vars.ipAddress = ipAddress

  const handleRestart = () => {
    setisLoading(true)
    const data = {
      temp: 'temp data'
    }

    axios
      .post(`http://${ipAddress}:3000/restart`, data)
      .then((val) => {
        console.log(val.data)
        alert(JSON.stringify(val.data.payload))
      })
      .catch((er) => {
        console.log(er)
        alert(`failed to send request http://${ipAddress}/\n` + er.message)
      })
      .finally(() => setisLoading(false))
  }

  const handlePing = () => {
    setisLoading(true)
    axios
      .get(`http://${ipAddress}:3000/ping`)
      .then((val) => alertJson('Success', val.data))
      .catch((er) => alertJson('Failed', er.message))
      .finally(() => setisLoading(false))
  }

  const handleVariable = () => {
    setisLoading(true)
    axios
      .get(`http://${ipAddress}:3000/variable`)
      .then((val) => alertJson('Success', val.data))
      .catch((er) => alertJson('Failed', er.message))
      .finally(() => setisLoading(false))
  }

  useEffect(() => {
    const loadIp = async () => {
      const ip = await loadIpAddress()
      setIpAddress(ip)
    }
    loadIp()

    NetInfo.fetch().then((state) => setnetinfo(state))
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: vars.color.four }}>
      <Loading display={isLoading} style={{ marginTop: 30 }} />

      <View style={styles.inputIpContainer}>
        <Text>Click to set target IP address:</Text>
        <TextInput
          style={styles.inputIp}
          placeholder="IP address"
          value={ipAddress}
          onChangeText={async (val) => {
            setIpAddress(val)
            try {
              await AsyncStorage.setItem('ipAddress', val)
            } catch (error) {
              console.error(error)
            }
          }}
          keyboardType="number-pad"
        />
        <MyButton title={'ping'} textStyle={{ fontSize: 10 }} btnStyle={styles.inputIpBtn} onPress={handlePing} />
      </View>

      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <Text>Setting</Text>

        <MyButton
          title="Restart"
          onPress={handleRestart}
          btnStyle={{ margin: 15, backgroundColor: 'red' }}
          textStyle={{ fontWeight: 'bold', color: 'black' }}
        />

        <MyButton
          title="Variable"
          btnStyle={{ margin: 15, backgroundColor: 'blue' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={handleVariable}
        />

        <MyButton
          title="Net info"
          btnStyle={{ margin: 15, backgroundColor: 'blue' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={() => alertJson('Network information', netinfo)}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  inputIpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  scrollViewContainer: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 30,
    margin: 10,
    marginTop: 30,
    backgroundColor: vars.color.four
  },
  inputIp: {
    borderColor: 'gray',
    padding: 10,
    borderWidth: 0,
    fontSize: 40,
    textAlign: 'center'
  },
  inputIpBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  }
})

export default Setting
