import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import vars from './components/Vars'
import MyButton from './components/MyButton'
import axios from 'axios'
import SelectDropdown from 'react-native-select-dropdown'

const Color = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [palette, setpalette] = useState(['#f26522'])

  const [colorMode, setcolorMode] = useState('solid')
  const colorModeList = ['solid', 'random']

  const loadIpAddress = async () => {
    try {
      const ipAddress = await AsyncStorage.getItem('ipAddress')
      if (ipAddress !== null) setIpAddress(ipAddress)
    } catch (error) {
      console.error(error)
    }
  }

  // const handleChangetimeformat = async () => {
  //   const data = {
  //     format: 24
  //   }

  //   axios
  //     .post(`http://${ipAddress}:3000/timeformat`, data)
  //     .then((val) => {
  //       console.log(val.data)
  //       alert(JSON.stringify(val.data.payload))
  //     })
  //     .catch((er) => {
  //       console.log(er)
  //       alert(`failed to send request http://${ipAddress}/\n` + er.message)
  //     })
  // }

  // const handleChangebrightness = async () => {
  //   const data = {
  //     brightness: 100
  //   }

  //   axios
  //     .post(`http://${ipAddress}:3000/brightness`, data)
  //     .then((val) => {
  //       console.log(val.data)
  //       alert(JSON.stringify(val.data.payload))
  //     })
  //     .catch((er) => {
  //       console.log(er)
  //       alert(`failed to send request http://${ipAddress}/\n` + er.message)
  //     })
  // }

  const handleChangeColorMode = () => {
    const data = {
      mode: colorMode + '\0\0\0\0\0\0\0\0',
      limit: 100
    }

    axios
      .post(`http://${ipAddress}:3000/color/mode`, data)
      .then((val) => {
        console.log(val.data)
        alert(JSON.stringify(val.data.payload))
      })
      .catch((er) => {
        console.log(er)
        alert(`failed to send request http://${ipAddress}/\n` + er.message)
      })
  }

  useEffect(() => {
    const loadIp = async () => {
      await loadIpAddress()
    }
    loadIp()
  }, [])

  return (
    <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      {/* <MyButton
        title="Set"
        onPress={handleChangetimeformat}
        btnStyle={{ marginTop: 50 }}
      />

      <MyButton
        title="brightness"
        onPress={handleChangebrightness}
        btnStyle={{ marginTop: 50 }}
      /> */}

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 50 }}>
        <SelectDropdown
          defaultValue={colorMode}
          defaultButtonText={colorMode}
          buttonStyle={{ borderWidth: 1, borderRadius: 10, width: 150 }}
          buttonTextStyle={{ fontSize: 15, fontWeight: 'bold' }}
          data={colorModeList}
          onSelect={(selectedItem, index) => {
            setcolorMode(selectedItem)
          }}
        />
        <MyButton title="Set" onPress={handleChangeColorMode} btnStyle={{ width: 120 }} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 30,
    margin: 10,
    marginTop: 30,
    backgroundColor: vars.color.four
  }
})

export default Color
