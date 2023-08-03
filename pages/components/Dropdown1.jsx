import { Image, StyleSheet, Text, View } from 'react-native'
import Dropdown from 'react-native-select-dropdown'
import MyButton from './MyButton'

const SelectDropdown = ({ defaultValue, data, onSelect, onPress, text }) => {
  return (
    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, paddingBottom: 15, marginBottom: 15 }}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.selectedItemContainer}>
        <Dropdown
          defaultValue={defaultValue}
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
          defaultButtonText={defaultValue}
          buttonStyle={{ borderWidth: 1, borderRadius: 10, width: 100 }}
          buttonTextStyle={{ fontSize: 15, fontWeight: 'bold' }}
          data={data}
          onSelect={onSelect}
          dropdownStyle={{ backgroundColor: 'white', borderRadius: 10, marginTop: -30 }}
          selectedRowStyle={{ backgroundColor: '#d9d9d9' }}
          rowTextStyle={{ fontSize: 14 }}
        />
        <MyButton title="Set" onPress={onPress} btnStyle={styles.btnStyle} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  selectedItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  btnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CFCFFC'
  }
})

export default SelectDropdown
