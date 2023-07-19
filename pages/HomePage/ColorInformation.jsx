import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useState } from 'react'
import Modal from 'react-native-modal'
import MyButton from '../components/MyButton'

const ColorInformation = ({ existColor, brightness, onChangeColor, onChangeBrightness }) => {
  const [isModalVisible, setModalVisible] = useState(false)

  return (
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

      <Modal isVisible={isModalVisible} animationIn={'slideInUp'} animationOut={'fadeOut'} style={{ margin: 20 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#5D646F',
            borderRadius: 15,
            maxHeight: 180,
            marginTop: 100
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ color: 'white', fontWeight: 700 }}>Color : </Text>
            <TextInput
              style={{ borderBottomWidth: 1, color: 'white', borderColor: 'white', padding: 0 }}
              placeholderTextColor={'black'}
              defaultValue={existColor}
              onChange={onChangeColor}
              keyboardType={'default'}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ color: 'white', fontWeight: 700 }}>Brightness : </Text>
            <TextInput
              style={{ borderBottomWidth: 1, color: 'white', borderColor: 'white', padding: 0 }}
              placeholderTextColor={'black'}
              defaultValue={`${Math.round(brightness / 2.5)}`}
              onChangeText={onChangeBrightness}
              keyboardType={'number-pad'}
            />
            <Text style={{ color: 'white', fontWeight: 700 }}>%</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', gap: 50 }}>
            <MyButton
              textStyle={{ color: 'white', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 10 }}
              title="Close"
              onPress={() => setModalVisible(!isModalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ColorInformation

const styles = StyleSheet.create({
  colorInformation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    marginTop: -10
  }
})
