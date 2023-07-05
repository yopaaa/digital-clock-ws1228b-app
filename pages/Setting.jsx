import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyButton from './components/MyButton'
import axios from 'axios'
import alertJson from './function/alertJson'
import Loading from './components/Loading'
import loadIpAddress from './function/loadIpAddress'

const pingIPAddress = (ipAddress) => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime()

    fetch(`http://${ipAddress}`, { method: 'HEAD', timeout: 5000 })
      .then(() => {
        const endTime = new Date().getTime()
        const duration = endTime - startTime
        resolve(duration)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const Setting = () => {
  const [netinfo, setnetinfo] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [ipAddress, setIpAddress] = useState('')

  const handleRestart = () => {
    setisLoading(true)

    axios
      .delete(`http://${ipAddress}:3000/restart`)
      .then((val) => {
        console.log(val.data)
        alert('Success!!!')
      })
      .catch((er) => {
        console.log(er)
        alert(`failed to send request http://${ipAddress}/\n` + er.message)
      })
      .finally(() => setisLoading(false))
  }

  const handleReset = () => {
    setisLoading(true)

    axios
      .delete(`http://${ipAddress}:3000/reset`)
      .then((val) => {
        console.log(val.data)
        alert('Success!!!')
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

  const handleInfo = () => {
    setisLoading(true)
    axios
      .post(`http://${ipAddress}:3000/info`, {})
      .then((val) => alertJson('Success', val.data))
      .catch((er) => alertJson('Failed', er.message))
      .finally(() => setisLoading(false))
  }

  const handlesPing = () => {
    const ipAddress = 'example.com' // Ganti dengan alamat IP yang ingin Anda ping
    pingIPAddress(ipAddress)
      .then((duration) => {
        // setPingResult(duration)
        console.log(duration)
      })
      .catch((error) => {
        console.log('Error:', error)
        // setPingResult(null)
      })
  }

  useEffect(() => {
    const loadIp = async () => {
      const ip = await loadIpAddress()
      setIpAddress(ip)
    }
    loadIp()
    handlesPing()
    NetInfo.fetch().then((state) => setnetinfo(state))
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#1C1C23' }}>
      <Loading display={isLoading} style={{ marginTop: 30 }} />

      <View style={styles.inputIpContainer}>
        <Text style={{ color: 'white' }}>Click to set target IP address:</Text>
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
        <MyButton title={'ping'} textStyle={{ fontSize: 11, color: 'white' }} btnStyle={styles.inputIpBtn} onPress={handlePing} />
      </View>

      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <MyButton
          title="Scan devices"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={handleInfo}
        />

        <MyButton
          title="Devices info"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={handleInfo}
        />

        {/* <MyButton
          title="Test connections"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={handleIsInternetConnection}
        /> */}

        <MyButton
          title="Net info"
          btnStyle={{ margin: 10, borderWidth: 1, borderColor: '#CFCFFC' }}
          textStyle={{ fontWeight: 'bold', color: 'white' }}
          onPress={() => alertJson('Network information', netinfo)}
        />

        <MyButton
          title="Restart"
          onPress={handleRestart}
          btnStyle={{ margin: 15, backgroundColor: 'red' }}
          textStyle={{ fontWeight: 'bold', color: 'black' }}
        />

        <MyButton
          title="Reset"
          onPress={handleReset}
          btnStyle={{ margin: 15, backgroundColor: 'red' }}
          textStyle={{ fontWeight: 'bold', color: 'black' }}
        />

        <View style={{ marginTop: 50 }}>{/* {BLANK} */}</View>
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
    // borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // margin: 10,
    marginTop: 20,
    backgroundColor: '#353542'
  },
  inputIp: {
    padding: 10,
    borderWidth: 0,
    fontSize: 40,
    textAlign: 'center',
    color: 'white'
  },
  inputIpBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#83839C',
    borderWidth: 1,
    borderColor: '#CFCFFC'
  }
})

export default Setting
