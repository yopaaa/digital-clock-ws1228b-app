import { StyleSheet, View, ScrollView } from 'react-native'
import { useState } from 'react'
import Dropdown from '../components/Dropdown1'
import Form from '../components/Form'
import Paho from 'paho-mqtt'

const Color = ({ clientMqtt, selectedDevices }) => {
  const [colorMode, setcolorMode] = useState('solid')
  const [timeformat, settimeformat] = useState(24)

  const [isStaticIp, setisStaticIp] = useState(true)
  const [staticipAddress, setstaticIpAddress] = useState('')

  const [SSID, setSSID] = useState('')
  const [password, setpassword] = useState('')

  const [mode, setmode] = useState('clock')
  const [limit, setlimit] = useState(120)

  const [segmenMode1, setsegmenMode1] = useState('hour')
  const [segmenMode2, setsegmenMode2] = useState('min')

  const handleChangeColorMode = () => {
    const data = {
      colorMode
    }

    const message = new Paho.Message(JSON.stringify(data))
    message.destinationName = selectedDevices + '-mode'
    clientMqtt.send(message)
  }

  const handleChangetimeformat = () => {
    const data = {
      format: timeformat
    }

    const message = new Paho.Message(JSON.stringify(data))
    message.destinationName = selectedDevices + '-time'
    clientMqtt.send(message)
  }

  const handleChangesSagmenMode = () => {
    const data = {
      segment1: segmenMode1,
      segment2: segmenMode2
    }

    const message = new Paho.Message(JSON.stringify(data))
    message.destinationName = selectedDevices + '-mode'
    clientMqtt.send(message)
  }

  const handleSetMode = () => {
    const data = {
      mode,
      limit
    }

    const message = new Paho.Message(JSON.stringify(data))
    message.destinationName = selectedDevices + '-mode'
    clientMqtt.send(message)
  }

  const handleSetWIFISTA = () => {
    const data = {
      STAssid: SSID,
      STApassword: password
    }

    const message = new Paho.Message(JSON.stringify(data))
    message.destinationName = selectedDevices + '-wifi'
    clientMqtt.send(message)
  }

  return (
    <View style={styles.container}>
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
          text={'Segmen1 mode'}
          defaultValue={segmenMode1}
          data={['hour', 'isdst', 'mday', 'min', 'mon', 'sec', 'wday', 'yday', 'year']}
          onSelect={(selectedItem, index) => {
            setsegmenMode1(selectedItem)
          }}
          onPress={handleChangesSagmenMode}
        />

        <Dropdown
          text={'Segmen2 mode'}
          defaultValue={segmenMode2}
          data={['hour', 'isdst', 'mday', 'min', 'mon', 'sec', 'wday', 'yday', 'year']}
          onSelect={(selectedItem, index) => {
            setsegmenMode2(selectedItem)
          }}
          onPress={handleChangesSagmenMode}
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
          onSubmite={handleSetMode}
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
          onSubmite={handleSetWIFISTA}
        />

        <View style={{ marginTop: 50 }}>{/* {BLANK} */}</View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: '100%'
  },
  scrollViewContainer: {
    padding: 15,
    flex: 1,
    margin: 10,
    marginTop: 0,
    paddingTop: 0
  }
})

export default Color
