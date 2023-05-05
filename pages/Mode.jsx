import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import vars from './components/Vars'
import MyButton from './components/MyButton'
import axios from 'axios'
import SelectDropdown from 'react-native-select-dropdown'
import Loading from './components/Loading'
import loadIpAddress from './function/loadIpAddress'

const Color = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [colorMode, setcolorMode] = useState('solid')
  const [timeformat, settimeformat] = useState(24)

  const colorModeList = ['solid', 'random']

  const handleChangeColorMode = () => {
    setisLoading(true)
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
      .finally(() => setisLoading(false))
  }

  const handleChangetimeformat = () => {
    setisLoading(true)
    const data = {
      format: timeformat
    }

    axios
      .post(`http://${ipAddress}:3000/timeformat`, data)
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

  useEffect(() => {
    const loadIp = async () => {
      const ip = await loadIpAddress()
      setIpAddress(ip)
    }
    loadIp()
  }, [])

  return (
    <View style={styles.container}>
      <Loading display={isLoading} />
      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Color mode</Text>
          <View style={styles.selectedItemContainer}>
            <SelectDropdown
              defaultValue={colorMode}
              renderDropdownIcon={(isOpened) => {
                if (isOpened) {
                  return <Text>{'^'}</Text>
                }
                return <Text>{'>'}</Text>
              }}
              dropdownIconPosition={'right'}
              defaultButtonText={colorMode}
              buttonStyle={{ borderWidth: 1, borderRadius: 10, width: 100 }}
              buttonTextStyle={{ fontSize: 15, fontWeight: 'bold' }}
              data={colorModeList}
              onSelect={(selectedItem, index) => {
                setcolorMode(selectedItem)
              }}
            />
            <MyButton
              title="Set"
              onPress={handleChangeColorMode}
              btnStyle={{ justifyContent: 'center', alignItems: 'center', width: '50%', height: 50 }}
            />
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Time format</Text>
          <View style={styles.selectedItemContainer}>
            <SelectDropdown
              defaultValue={timeformat}
              renderDropdownIcon={(isOpened) => {
                if (isOpened) {
                  return <Text>{'^'}</Text>
                }
                return <Text>{'>'}</Text>
              }}
              dropdownIconPosition={'right'}
              defaultButtonText={`${timeformat}`}
              buttonStyle={{ borderWidth: 1, borderRadius: 10, width: 100 }}
              buttonTextStyle={{ fontSize: 15, fontWeight: 'bold' }}
              data={[12, 24]}
              onSelect={(selectedItem, index) => {
                settimeformat(selectedItem)
              }}
            />
            <MyButton
              title="Set"
              onPress={handleChangetimeformat}
              btnStyle={{ justifyContent: 'center', alignItems: 'center', width: '50%', height: 50 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    overflow: 'hidden',
    height: '95%',
    // backgroundColor: 'blue',
    margin: 10,
    marginTop: 30
  },
  scrollViewContainer: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 30,
    // margin: 10,
    // marginTop: 30,
    backgroundColor: vars.color.four
  },
  selectedItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  }
})

export default Color
