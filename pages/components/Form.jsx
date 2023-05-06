import { StyleSheet, Text, View, TextInput } from 'react-native'
import Dropdown from 'react-native-select-dropdown'
import MyButton from './MyButton'

const Form = ({ onSubmite, title, select = [], textInput = [] }) => {
  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={styles.title}>{title}</Text>

      {select.map((val) => {
        const { title, defaultValue, data, onSelect } = val
        return (
          <View key={title} style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{title}</Text>
            <Text>:</Text>
            <Dropdown
              defaultValue={defaultValue}
              renderDropdownIcon={(isOpened) => {
                if (isOpened) {
                  return <Text>{'^'}</Text>
                }
                return <Text>{'>'}</Text>
              }}
              dropdownIconPosition={'right'}
              defaultButtonText={defaultValue}
              buttonStyle={{ borderWidth: 1, borderRadius: 10, height: 30, width: 100 }}
              buttonTextStyle={{ fontSize: 12, fontWeight: 'bold' }}
              data={data}
              onSelect={onSelect}
              dropdownStyle={{ backgroundColor: 'white', borderRadius: 10, marginTop: -30 }}
              selectedRowStyle={{ backgroundColor: '#d9d9d9' }}
              rowTextStyle={{ fontSize: 14 }}
            />
          </View>
        )
      })}

      {textInput.map((val) => {
        const { title, onChangeText, placeholder = 'input', value, keyboardType = 'number-pad' } = val
        return (
          <View key={title} style={styles.inputContainer}>
            <Text style={styles.inputTitle}>{title}</Text>
            <Text>:</Text>
            <TextInput
              style={{ borderBottomWidth: 2, marginBottom: 10, width: 100 }}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
            />
          </View>
        )
      })}

      <MyButton title={'Submite'} onPress={onSubmite} btnStyle={{ marginTop: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  inputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 30, marginBottom: 10 },
  inputTitle: { width: 70 }
})

export default Form
