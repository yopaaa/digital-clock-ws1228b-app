import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import vars from './components/Vars'
import MyButton from './components/MyButton'
import axios from 'axios'
// import ConnectWifi from './ConnectWifi'

const Setting = () => {
  const [netinfo, setnetinfo] = useState('')

  const [ipAddress, setIpAddress] = useState('')
  vars.ipAddress = ipAddress

  const loadIpAddress = async () => {
    try {
      const ipAddress = await AsyncStorage.getItem('ipAddress')
      if (ipAddress !== null) {
        setIpAddress(ipAddress)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRestart = () => {
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
  }
  const handlePing = () => {
    axios
      .get(`http://${ipAddress}:3000/ping`)
      .then((val) => {
        alert(`Success to send request \nhttp://${ipAddress}/\n`)
      })
      .catch((er) => {
        console.log(er)
        alert(`failed to send request \nhttp://${ipAddress}/\n` + er.message)
      })
  }

  useEffect(() => {
    loadIpAddress()

    NetInfo.fetch().then((state) => {
      console.log(state)
      setnetinfo(JSON.stringify(state))
      console.log(netinfo)
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: vars.color.four }}>
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
              console.log(`IP address saved successfully : ${val}`)
            } catch (error) {
              console.error(error)
            }
          }}
          keyboardType="number-pad"
        />
        <MyButton title={'ping'} textStyle={{ fontSize: 10 }} btnStyle={styles.inputIpBtn} onPress={handlePing} />
      </View>

      <ScrollView
        style={{
          borderWidth: 1,
          padding: 15,
          flex: 1,
          borderRadius: 30,
          margin: 10
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text>Setting</Text>
        <MyButton
          title="Restart"
          onPress={handleRestart}
          btnStyle={{ marginTop: 50, backgroundColor: 'red' }}
          textStyle={{ fontWeight: 'bold', color: 'black' }}
        />
        {/* <Text>{netinfo}</Text> */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  inputIpContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
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
