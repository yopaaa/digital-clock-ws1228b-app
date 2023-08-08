import { StyleSheet, View, ScrollView, Image, Text, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import Dropdown1 from '../components/Dropdown1'
import Dropdown2 from '../components/Dropdown2'
import RNDropdown from 'react-native-select-dropdown'
import publish from '../function/publish'
import MyButton from '../components/MyButton'

const GMTList = [
  'gmt+0',
  'gmt+1',
  'gmt+2',
  'gmt+3',
  'gmt+4',
  'gmt+5',
  'gmt+6',
  'gmt+7',
  'gmt+8',
  'gmt+9',
  'gmt+10',
  'gmt+11',
  'gmt+12',
  'gmt-1',
  'gmt-2',
  'gmt-3',
  'gmt-4',
  'gmt-5',
  'gmt-6',
  'gmt-7',
  'gmt-8',
  'gmt-9',
  'gmt-10',
  'gmt-11',
  'gmt-12'
]
const OffsetGMTList = [
  '0 minute',
  '1 minute',
  '2 minute',
  '3 minute',
  '4 minute',
  '5 minute',
  '6 minute',
  '7 minute',
  '8 minute',
  '9 minute',
  '10 minute',
  '11 minute',
  '12 minute',
  '13 minute',
  '14 minute',
  '15 minute',
  '16 minute',
  '17 minute',
  '18 minute',
  '19 minute',
  '20 minute',
  '21 minute',
  '22 minute',
  '23 minute',
  '24 minute',
  '25 minute',
  '26 minute',
  '27 minute',
  '28 minute',
  '29 minute',
  '30 minute',
  '31 minute',
  '32 minute',
  '33 minute',
  '34 minute',
  '35 minute',
  '36 minute',
  '37 minute',
  '38 minute',
  '39 minute',
  '40 minute',
  '41 minute',
  '42 minute',
  '43 minute',
  '44 minute',
  '45 minute',
  '46 minute',
  '47 minute',
  '48 minute',
  '49 minute',
  '50 minute',
  '51 minute',
  '52 minute',
  '53 minute',
  '54 minute',
  '55 minute',
  '56 minute',
  '57 minute',
  '58 minute',
  '59 minute'
]
const segmentDisplayModeList = ['sec', 'min', 'hour', 'wday', 'mday', 'mon'] // 'isdst', 'yday', 'year'

const Color = ({ clientMqtt, selectedDevicesID, subscribeMsg }) => {
  const [mode, setmode] = useState('clock')
  const [colorMode, setcolorMode] = useState('solid')
  const [timeformat, settimeformat] = useState(24)
  const [GMT, setGMT] = useState('gmt+7')
  const [OffsetGMT, setOffsetGMT] = useState('0 minute')

  const [segmenMode1, setsegmenMode1] = useState('hour')
  const [segmenMode2, setsegmenMode2] = useState('min')

  const [scors1, setscors1] = useState(0)
  const [scors2, setscors2] = useState(0)
  const [isPause, setIsPause] = useState(true)
  const [counterTargetLimit, setcounterTargetLimit] = useState(100)
  const [countdownStartNumber, setcountdownStartNumber] = useState(100)

  useEffect(() => {
    const x = { topic: subscribeMsg.topic, payload: subscribeMsg.payloadString }

    if (x.topic === selectedDevicesID + '-info-mode') {
      const payload = JSON.parse(x.payload)
      setmode(payload.mode)
      setcolorMode(payload.colorMode)
      setsegmenMode1(payload.segment1)
      setsegmenMode2(payload.segment2)
      setscors1(payload.scors1)
      setscors2(payload.scors2)
      setIsPause(payload.isPause)
      setcounterTargetLimit(payload.limit)
      setcountdownStartNumber(payload.countDownCount)
    }

    if (x.topic === selectedDevicesID + '-info-time') {
      // {"daylightOffset_sec": 0, "format": 12, "gmtOffset_sec": 25200, "ntpServer": "pool.ntp.org", "timestamp": 1690864404}
      const payload = JSON.parse(x.payload)

      settimeformat(payload.format)

      // const gmtPlus7Hours = ( + 7 * 3600) / 3600
      const xx = Math.floor(payload.gmtOffset_sec / 3600)
      const y = xx > 0 ? `gmt+${xx}` : `gmt-${xx}`
      const z = `${(payload.gmtOffset_sec % 3600) / 60} minute`

      setGMT(y)
      setOffsetGMT(z)
    }
  }, [subscribeMsg])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <RNDropdown
          defaultValue={mode}
          renderDropdownIcon={(isOpened) => {
            if (isOpened) {
              return (
                <Image
                  style={{ width: 16, height: 12, transform: [{ rotate: '90deg' }] }}
                  source={require('../../assets/icon/triangle-icon.png')}
                />
              )
            }
            return <Image style={{ width: 16, height: 12 }} source={require('../../assets/icon/triangle-icon.png')} />
          }}
          dropdownIconPosition={'right'}
          defaultButtonText={mode}
          buttonStyle={{ borderWidth: 1, borderRadius: 10, width: '100%', marginBottom: 20 }}
          buttonTextStyle={{ fontSize: 15, fontWeight: 'bold' }}
          data={['clock', 'counter', 'countdown', 'scors']}
          onSelect={(selectedItem) => {
            setmode(selectedItem)
            publish(clientMqtt, selectedDevicesID + '-mode', { mode: selectedItem })
          }}
          dropdownStyle={{ backgroundColor: 'white', borderRadius: 10, marginTop: -30 }}
          selectedRowStyle={{ backgroundColor: '#d9d9d9' }}
          rowTextStyle={{ fontSize: 14 }}
        />

        <Dropdown1
          text={'Color mode'}
          defaultValue={colorMode}
          data={['solid', 'random']}
          onSelect={(selectedItem, index) => {
            setcolorMode(selectedItem)
          }}
          onPress={() => publish(clientMqtt, selectedDevicesID + '-mode', { colorMode })}
        />

        {mode === 'clock' && (
          <View>
            <Dropdown1
              text={'Time format'}
              defaultValue={timeformat}
              data={[12, 24]}
              onSelect={(selectedItem, index) => {
                settimeformat(selectedItem)
              }}
              onPress={() => publish(clientMqtt, selectedDevicesID + '-time', { format: timeformat })}
            />

            <Dropdown2
              text={'Segment display time mode'}
              content={[
                {
                  title: 'Segment left',
                  defaultValue: segmenMode1,
                  data: segmentDisplayModeList,
                  onSelect: (selectedItem) => setsegmenMode1(selectedItem)
                },
                {
                  title: 'Segment right',
                  defaultValue: segmenMode2,
                  data: segmentDisplayModeList,
                  onSelect: (selectedItem) => setsegmenMode2(selectedItem)
                }
              ]}
              onPress={() => publish(clientMqtt, selectedDevicesID + '-mode', { segment1: segmenMode1, segment2: segmenMode2 })}
            />

            <Dropdown2
              text={'Standar waktu'}
              content={[
                {
                  title: 'GMT',
                  defaultValue: GMT,
                  data: GMTList,
                  onSelect: (selectedItem, index) => setGMT(selectedItem)
                },
                {
                  title: 'Offset',
                  defaultValue: OffsetGMT,
                  data: OffsetGMTList,
                  styles: { width: 150 },
                  onSelect: (selectedItem, index) => setOffsetGMT(selectedItem)
                }
              ]}
              onPress={() => {
                const sign = GMT[3] === '+' ? 1 : -1
                const hours = parseInt(GMT.slice(4), 10)
                const gmt = sign * hours * 3600
                const offsetgmt = OffsetGMTList.indexOf(OffsetGMT)

                publish(clientMqtt, selectedDevicesID + '-time', {
                  gmtOffset_sec: gmt + offsetgmt * 60
                })
              }}
            />
          </View>
        )}

        {mode === 'scors' && (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10 }}>Click to change scors</Text>
              <TextInput
                style={{
                  color: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  margin: 0,
                  padding: 0,
                  width: 30,
                  textAlign: 'center'
                }}
                onChangeText={(val) => {
                  const existValue = Number(val)
                  setscors1(existValue)
                  publish(clientMqtt, selectedDevicesID + '-mode', { scors1: existValue })
                  publish(clientMqtt, selectedDevicesID + '-ping', {})
                }}
                value={String(scors1)}
                keyboardType="numeric"
              />
              <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10 }}>and</Text>
              <TextInput
                style={{
                  color: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  margin: 0,
                  padding: 0,
                  width: 30,
                  textAlign: 'center'
                }}
                onChangeText={(val) => {
                  const existValue = Number(val)
                  setscors2(existValue)
                  publish(clientMqtt, selectedDevicesID + '-mode', { scors2: existValue })
                  publish(clientMqtt, selectedDevicesID + '-ping', {})
                }}
                value={String(scors2)}
                keyboardType="numeric"
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10 }}>Scors 1</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <MyButton
                  title={'-'}
                  onPress={() => {
                    const existValue = scors1 - 1
                    setscors1(existValue)
                    publish(clientMqtt, selectedDevicesID + '-mode', { scors1: existValue })
                    publish(clientMqtt, selectedDevicesID + '-ping', {})
                  }}
                  btnStyle={{
                    ...styles.scorsBottom,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRightWidth: 0,
                    width: 120,
                    backgroundColor: 'red'
                  }}
                />
                <MyButton
                  title={'+'}
                  onPress={() => {
                    const existValue = scors1 + 1
                    setscors1(existValue)
                    publish(clientMqtt, selectedDevicesID + '-mode', { scors1: existValue })
                    publish(clientMqtt, selectedDevicesID + '-ping', {})
                  }}
                  btnStyle={{
                    ...styles.scorsBottom,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeftWidth: 0,
                    width: 120,
                    backgroundColor: 'green'
                  }}
                />
                <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10, position: 'absolute' }}>{scors1}</Text>
              </View>

              <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10 }}>Scors 2</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <MyButton
                  title={'-'}
                  onPress={() => {
                    const existValue = scors2 - 1
                    setscors2(existValue)
                    publish(clientMqtt, selectedDevicesID + '-mode', { scors2: existValue })
                    publish(clientMqtt, selectedDevicesID + '-ping', {})
                  }}
                  btnStyle={{
                    ...styles.scorsBottom,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRightWidth: 0,
                    width: 120,
                    backgroundColor: 'red'
                  }}
                />
                <MyButton
                  title={'+'}
                  onPress={() => {
                    const existValue = scors2 + 1
                    setscors2(existValue)
                    publish(clientMqtt, selectedDevicesID + '-mode', { scors2: existValue })
                    publish(clientMqtt, selectedDevicesID + '-ping', {})
                  }}
                  btnStyle={{
                    ...styles.scorsBottom,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeftWidth: 0,
                    width: 120,
                    backgroundColor: 'green'
                  }}
                />
                <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10, position: 'absolute' }}>{scors2}</Text>
              </View>
            </View>
          </View>
        )}

        {mode === 'counter' && (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10 }}>Counter target: </Text>
              <TextInput
                style={{
                  color: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  margin: 0,
                  padding: 0,
                  width: 30,
                  textAlign: 'center'
                }}
                onChangeText={(val) => {
                  const limit = Number(val)
                  setcounterTargetLimit(limit)
                  publish(clientMqtt, selectedDevicesID + '-mode', { limit })
                  publish(clientMqtt, selectedDevicesID + '-ping', {})
                }}
                value={String(counterTargetLimit)}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <MyButton
                title={'-'}
                onPress={() => {
                  const limit = counterTargetLimit - 1
                  setcounterTargetLimit(limit)
                  publish(clientMqtt, selectedDevicesID + '-mode', { limit })
                  publish(clientMqtt, selectedDevicesID + '-ping', {})
                }}
                btnStyle={{
                  ...styles.scorsBottom,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRightWidth: 0,
                  width: 120,
                  backgroundColor: 'red'
                }}
              />
              <MyButton
                title={'+'}
                onPress={() => {
                  const limit = counterTargetLimit + 1
                  setcounterTargetLimit(limit)
                  publish(clientMqtt, selectedDevicesID + '-mode', { limit })
                  publish(clientMqtt, selectedDevicesID + '-ping', {})
                }}
                btnStyle={{
                  ...styles.scorsBottom,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderLeftWidth: 0,
                  width: 120,
                  backgroundColor: 'green'
                }}
              />
              <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10, position: 'absolute' }}>
                {counterTargetLimit}
              </Text>
            </View>

            <MyButton
              title={isPause ? 'Start' : 'Stop'}
              onPress={() => {
                const ispause = !isPause
                console.log(ispause)
                setIsPause(ispause)
                publish(clientMqtt, selectedDevicesID + '-mode', { isPause: ispause })
              }}
              btnStyle={{ ...styles.scorsBottom, height: 50 }}
            />
            <MyButton
              title={'reset counter'}
              onPress={() => publish(clientMqtt, selectedDevicesID + '-mode', { counterCount: 0 })}
              btnStyle={{ ...styles.scorsBottom, height: 50 }}
            />
          </View>
        )}

        {mode === 'countdown' && (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10 }}>Countdown start count: </Text>
              <TextInput
                style={{
                  color: 'white',
                  borderWidth: 1,
                  borderColor: 'white',
                  margin: 0,
                  padding: 0,
                  width: 30,
                  textAlign: 'center'
                }}
                onChangeText={(val) => {
                  const limit = Number(val)
                  setcountdownStartNumber(limit)
                  publish(clientMqtt, selectedDevicesID + '-mode', { limit })
                  publish(clientMqtt, selectedDevicesID + '-ping', {})
                }}
                value={String(countdownStartNumber)}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <MyButton
                title={'-'}
                onPress={() => {
                  const limit = countdownStartNumber - 1
                  setcountdownStartNumber(limit)
                  publish(clientMqtt, selectedDevicesID + '-mode', { limit })
                  publish(clientMqtt, selectedDevicesID + '-ping', {})
                }}
                btnStyle={{
                  ...styles.scorsBottom,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRightWidth: 0,
                  width: 120,
                  backgroundColor: 'red'
                }}
              />
              <MyButton
                title={'+'}
                onPress={() => {
                  const limit = countdownStartNumber + 1
                  setcountdownStartNumber(limit)
                  publish(clientMqtt, selectedDevicesID + '-mode', { limit })
                  publish(clientMqtt, selectedDevicesID + '-ping', {})
                }}
                btnStyle={{
                  ...styles.scorsBottom,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderLeftWidth: 0,
                  width: 120,
                  backgroundColor: 'green'
                }}
              />
              <Text style={{ fontWeight: 800, fontSize: 15, color: 'white', margin: 10, position: 'absolute' }}>
                {countdownStartNumber}
              </Text>
            </View>

            <MyButton
              title={isPause ? 'Start' : 'Stop'}
              onPress={() => {
                const ispause = !isPause
                console.log(ispause)
                setIsPause(ispause)
                publish(clientMqtt, selectedDevicesID + '-mode', { isPause: ispause })
              }}
              btnStyle={{ ...styles.scorsBottom, height: 50 }}
            />
            <MyButton
              title={'reset countdown'}
              onPress={() => publish(clientMqtt, selectedDevicesID + '-mode', { countDownCount: 100 })}
              btnStyle={{ ...styles.scorsBottom, height: 50 }}
            />
          </View>
        )}
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
  },
  scorsBottom: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: '#CFCFFC',
    marginBottom: 10
  }
})

export default Color
