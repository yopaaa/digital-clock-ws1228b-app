import { Image, StyleSheet, Text, View } from 'react-native'
import Dropdown from 'react-native-select-dropdown'
import MyButton from './MyButton'
import { useEffect, useState } from 'react'

function SelectDropdown({
  onPress,
  text,
  content = [{ title: null, defaultValue: null, data: ['one', 'two'], onSelect: () => {} }]
}) {
  const [dropdownList, setdropdownList] = useState()

  useEffect(() => {
    setdropdownList(
      content.map((val) => {
        return (
          <View style={{ alignItems: 'center', gap: 10 }} key={val.title}>
            <Text style={styles.title}>{val.title}</Text>
            <Dropdown
              defaultValue={val.defaultValue}
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
              defaultButtonText={val.defaultValue}
              buttonStyle={[{ borderWidth: 1, borderRadius: 10, width: 110 }, val.styles]}
              buttonTextStyle={{ fontSize: 15, fontWeight: 'bold' }}
              data={val.data}
              onSelect={val.onSelect}
              dropdownStyle={{ backgroundColor: 'white', borderRadius: 10, marginTop: -30 }}
              selectedRowStyle={{ backgroundColor: '#d9d9d9' }}
              rowTextStyle={{ fontSize: 14 }}
            />
          </View>
        )
      })
    )
  }, [])
  return (
    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, paddingBottom: 15, marginBottom: 15 }}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.selectedItemContainer}>{dropdownList}</View>
      <MyButton title="Set" onPress={onPress} btnStyle={styles.btnStyle} />
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  btnStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CFCFFC'
  }
})

export default SelectDropdown
