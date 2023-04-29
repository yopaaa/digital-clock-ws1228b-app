import { TouchableOpacity, Text } from 'react-native'
import vars from './Vars'

export default function MyButton(props) {
  const defaultBtnStyle = {
    backgroundColor: vars.color.two,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  }
  const btnStyle = { ...defaultBtnStyle, ...props.btnStyle }

  const defaultTextStyle = {
    color: vars.color.four,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize'
  }
  const textStyle = { ...defaultTextStyle, ...props.textStyle }

  return (
    <TouchableOpacity style={btnStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </TouchableOpacity>
  )
}
