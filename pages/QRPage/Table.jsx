import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function Table({ data = [{ value: 'null', title: 'null' }] }) {
  const [content, setContent] = useState([])
  const [isrefresh, setisrefresh] = useState()

  useEffect(() => {
    setContent(
      data.map((val, index) => {
        return (
          <View style={styles.tableRowContainer} key={val.value}>
            <View style={styles.centar}>
              <Text
                style={[
                  styles.rowText,
                  {
                    width: 30
                  }
                ]}
              >
                {index + 1}
              </Text>
            </View>
            <View style={styles.centar}>
              <Text
                style={[
                  styles.rowText,
                  {
                    width: 200,
                    overflow: 'hidden'
                  }
                ]}
              >
                {val.value}
              </Text>
            </View>
            <View style={styles.centar}>
              <TouchableOpacity
                style={styles.backBottom}
                onPress={() => {
                  data.splice(index, 1)
                  AsyncStorage.setItem('devicesList', JSON.stringify(data))
                  setisrefresh(Date.now())
                }}
              >
                <Text
                  style={[
                    styles.rowText,
                    {
                      width: 50,
                      color: 'red'
                    }
                  ]}
                >
                  delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      })
    )
  }, [data, isrefresh])

  return (
    <View style={styles.centar}>
      <View style={styles.tableHeadContainer}>
        <View style={styles.centar}>
          <Text
            style={[
              styles.headText,
              {
                width: 30
              }
            ]}
          >
            No
          </Text>
        </View>
        <View style={styles.centar}>
          <Text
            style={[
              styles.headText,
              {
                width: 200
              }
            ]}
          >
            Value
          </Text>
        </View>
        <View style={styles.centar}>
          <Text
            style={[
              styles.headText,
              {
                width: 50
              }
            ]}
          >
            Actions
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'column-reverse' }}>{content}</View>
    </View>
  )
}

export default Table

const styles = StyleSheet.create({
  centar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableHeadContainer: {
    width: 300,
    height: 30,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  tableRowContainer: {
    width: 300,
    height: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 0.6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff1a'
  },
  headText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    fontWeight: '700'
  },
  rowText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
    fontWeight: '700'
  }
})
