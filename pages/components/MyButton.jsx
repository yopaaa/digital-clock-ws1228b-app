import { TouchableOpacity, Text } from 'react-native'

export default function MyButton({ btnStyle, textStyle, onPress, title }) {
  const defaultBtnStyle = {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  }
  const btnStyles = { ...defaultBtnStyle, ...btnStyle }

  const defaultTextStyle = {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
    // textTransform: 'capitalize'
  }
  const textStyles = { ...defaultTextStyle, ...textStyle }

  return (
    <TouchableOpacity style={btnStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  )
}
