import { StyleSheet, View, ScrollView, TextInput, Text } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ColorPicker from '../lib/react-native-wheel-color-picker/ColorPicker'
import MyButton from './components/MyButton'
import axios from 'axios'
import Slider from '@react-native-community/slider'
import HorizontalColorPicker from './components/HorizontalColorPicker'
import alertJson from './function/alertJson'
import Loading from './components/Loading'
import loadIpAddress from './function/loadIpAddress'
import Modal from 'react-native-modal'
// import SegmentClock from './SegmentClock'

const Color = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const [brightness, setbrightness] = useState(130)
  const [palette, setpalette] = useState(['#f26522'])
  const [existColor, setexistColor] = useState(palette[0])

  const loadPalette = async () => {
    try {
      const getPalette = await AsyncStorage.getItem('palette')
      if (getPalette !== null) setpalette(JSON.parse(getPalette))
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeColor = async () => {
    setisLoading(true)
    if (!ipAddress) {
      const ip = await loadIpAddress()
      setIpAddress(ip)
    }

    let hex = existColor
    hex = hex.replace('#', '')

    const data = {
      red: `${parseInt(hex.substring(0, 2), 16)}\0\0\0`,
      green: `${parseInt(hex.substring(2, 4), 16)}\0\0\0`,
      blue: `${parseInt(hex.substring(4, 6), 16)}\0\0\0`,
      brightness: `${brightness}\0\0\0`
    }

    axios
      .post(`http://${ipAddress}:3000/color`, data)
      .then(async (val) => {
        if (!palette.includes(existColor)) {
          palette.unshift(existColor)
          if (palette.length > 20) setpalette(() => palette.slice(0, 20))

          try {
            await AsyncStorage.setItem('palette', JSON.stringify(palette))
            alertJson('Success', val.data.payload)
            loadPalette()
          } catch (error) {
            console.error(error)
          }
        }
      })
      .catch((er) => {
        console.log(er.message)
        alertJson('Failed', `failed to send request http://${ipAddress}/\n` + er.message)
      })
      .finally(() => {
        setisLoading(false)
      })
  }

  useEffect(() => {
    const loadIp = async () => {
      const ip = await loadIpAddress()
      setIpAddress(ip)
      await loadPalette()
    }
    loadIp()
  }, [])

  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Loading display={isLoading} style={{ marginTop: 50 }} />
      <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            // borderRadius: 20,
            marginTop: 30,
            height: 50,
            overflow: 'hidden'
            // margin: 10
          }}
        >
          <Text>hello</Text>
        </View>
        <View style={{ padding: 25, paddingTop: 0 }}>
          <ColorPicker
            swatches={false}
            ref={(r) => (this.picker = r)}
            color={existColor}
            onColorChangeComplete={(color) => setexistColor(color)}
            thumbSize={30}
            sliderSize={30}
          />

          <HorizontalColorPicker colorList={palette} onSelectColor={(color) => setexistColor(color)} />

          <View style={styles.colorInformation}>
            <MyButton
              title={`color : ${existColor}`}
              textStyle={{ color: 'white', fontSize: 13 }}
              onPress={() => setModalVisible(!isModalVisible)}
            />
            <MyButton
              title={`brightness : ${Math.round(brightness / 2.5)}%`}
              textStyle={{ color: 'white', fontSize: 13 }}
              onPress={() => setModalVisible(!isModalVisible)}
            />
          </View>

          <Slider
            style={{ width: '100%', height: 20 }}
            value={brightness}
            minimumValue={0}
            maximumValue={250}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(val) => setbrightness(Math.round(val))}
          />

          <MyButton
            title="Set color"
            onPress={handleChangeColor}
            btnStyle={{ marginTop: 20, borderWidth: 1, borderColor: '#CFCFFC' }}
          />
        </View>

        {/* <SegmentClock color={existColor} /> */}
      </ScrollView>

      <Modal isVisible={isModalVisible} animationIn={'slideInUp'} animationOut={'fadeOut'} style={{ margin: 0 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
            // maxHeight: 180,
            marginTop: 100
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text>Color : </Text>
            <TextInput
              style={{ borderBottomWidth: 1, color: 'black', borderColor: 'black', padding: 0 }}
              placeholderTextColor={'black'}
              placeholder={'placeholder'}
              defaultValue={existColor}
              onChangeText={(color) => (color.length === 5 ? setexistColor(color) : '')}
              keyboardType={'default'}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text>Brightness : </Text>
            <TextInput
              style={{ borderBottomWidth: 1, color: 'black', borderColor: 'black', padding: 0 }}
              placeholderTextColor={'black'}
              placeholder={'placeholder'}
              defaultValue={`${Math.round(brightness / 2.5)}`}
              // onChangeText={(color) => (color.length === 5 ? setexistColor(color) : '')}
              onChangeText={(val) => setbrightness(Math.round(Number(val) * 2.5))}
              keyboardType={'default'}
            />
            <Text>%</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', gap: 50 }}>
            <MyButton textStyle={{ color: 'black' }} title="Close" onPress={() => setModalVisible(!isModalVisible)} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: '100%',
    // margin: 10,
    // marginTop: 30,
    backgroundColor: 'gray'
  },
  scrollViewContainer: {
    // borderWidth: 1,
    // padding: 25,
    flex: 1,
    borderRadius: 30,
    // margin: 10,
    // marginTop: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
    // backgroundColor: '#353542'
  },
  colorInformation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 0
    // paddingTop:0
  }
})

export default Color
