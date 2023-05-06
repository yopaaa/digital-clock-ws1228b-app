import { StyleSheet, View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import vars from './components/Vars'
import axios from 'axios'
import Loading from './components/Loading'
import loadIpAddress from './function/loadIpAddress'
import Dropdown from './components/Dropdown1'
import Form from './components/Form'

const Color = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [colorMode, setcolorMode] = useState('solid')
  const [timeformat, settimeformat] = useState(24)

  const [isStaticIp, setisStaticIp] = useState(true)
  const [staticipAddress, setstaticIpAddress] = useState('')

  const [SSID, setSSID] = useState('')
  const [password, setpassword] = useState('')

  const [mode, setmode] = useState('clock')
  const [limit, setlimit] = useState(120)

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
      setstaticIpAddress(ip)
    }
    loadIp()
  }, [])

  return (
    <View style={styles.container}>
      <Loading display={isLoading} />
      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <Dropdown
          text={'Color mode'}
          defaultValue={colorMode}
          data={['solid', 'random']}
          onSelect={(selectedItem, index) => {
            setcolorMode(selectedItem)
          }}
          onPress={handleChangeColorMode}
        />

        <Dropdown
          text={'Time format'}
          defaultValue={timeformat}
          data={[12, 24]}
          onSelect={(selectedItem, index) => {
            settimeformat(selectedItem)
          }}
          onPress={handleChangetimeformat}
        />

        <Form
          title={'Set Mode'}
          select={[
            {
              title: 'Mode',
              defaultValue: mode,
              data: ['clock', 'counter', 'countdown'],
              onSelect: (val) => setmode(val)
            }
          ]}
          textInput={[
            {
              title: 'Limit',
              value: `${limit}`,
              keyboardType: 'number-pad',
              onChangeText: (val) => setlimit(val)
            }
          ]}
          onSubmite={() => console.log(mode + limit)}
        />

        <Form
          title={'Set Static IP Address'}
          select={[
            {
              title: 'is static ip',
              defaultValue: isStaticIp,
              data: [true, false],
              onSelect: (val) => setisStaticIp(val)
            }
          ]}
          textInput={[
            {
              title: 'static ip',
              value: staticipAddress,
              keyboardType: 'number-pad',
              onChangeText: (val) => setstaticIpAddress(val)
            }
          ]}
          onSubmite={() => console.log(isStaticIp + staticipAddress)}
        />

        <Form
          title={'Set Wifi Credentials'}
          textInput={[
            {
              title: 'SSID',
              value: SSID,
              keyboardType: 'visible-password',
              onChangeText: (val) => setSSID(val)
            },
            {
              title: 'Password',
              value: password,
              keyboardType: 'visible-password',
              onChangeText: (val) => setpassword(val)
            }
          ]}
          onSubmite={() => console.log(SSID + password)}
        />

        <View style={{ marginTop: 50 }}>{/* {BLANK} */}</View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    overflow: 'hidden',
    height: '95%',
    margin: 10,
    marginTop: 30
  },
  scrollViewContainer: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 30,
    backgroundColor: vars.color.four
  }
})

export default Color
