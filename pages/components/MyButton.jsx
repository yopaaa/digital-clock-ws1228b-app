import { TouchableOpacity, Text } from 'react-native'
import vars from './Vars'

export default function MyButton({ btnStyle, textStyle, onPress, title }) {
  const defaultBtnStyle = {
    backgroundColor: vars.color.two,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  }
  const btnStyles = { ...defaultBtnStyle, ...btnStyle }

  const defaultTextStyle = {
    color: vars.color.four,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize'
  }
  const textStyles = { ...defaultTextStyle, ...textStyle }

  return (
    <TouchableOpacity style={btnStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  )
}
