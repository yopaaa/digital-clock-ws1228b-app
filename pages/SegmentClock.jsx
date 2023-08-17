import { View, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

const SevenSegment = ({ value = 0, color = 'red' }) => {
  // Membuat konfigurasi digit Seven Segment
  const segments = [
    [1, 1, 1, 1, 1, 1, 0.2], // Number 0
    [0.2, 0.2, 1, 1, 0.2, 0.2, 0.2], // Number 1
    [0.2, 1, 1, 0.2, 1, 1, 1], // Number 2
    [0.2, 1, 1, 1, 1, 0.2, 1], // Number 3
    [1, 0.2, 1, 1, 0.2, 0.2, 1], // Number 4
    [1, 1, 0.2, 1, 1, 0.2, 1], // Number 5
    [1, 1, 0.2, 1, 1, 1, 1], // Number 6
    [0.2, 1, 1, 1, 0.2, 0.2, 0.2], // Number 7
    [1, 1, 1, 1, 1, 1, 1], // Number 8
    [1, 1, 1, 1, 1, 0.2, 1], // Number 9
    [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], // Digit off
    [1, 1, 0.2, 0.2, 1, 1, 1], // Alfabet E
    [1, 1, 0.2, 0.2, 0.2, 1, 0.2], // Alfabet r
    [0.2, 0.2, 0.2, 0.2, 1, 0.2, 0.2] // Simbol _
  ]

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.segment,
          {
            opacity: segments[value][1],
            backgroundColor: color,
            margin: 5
          }
        ]}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
        <View
          style={[
            styles.segment,
            {
              opacity: segments[value][0],
              backgroundColor: color,
              width: 20,
              height: 80,
              marginLeft: -20,
              marginTop: 0
            }
          ]}
        />
        <View
          style={[
            styles.segment,
            {
              opacity: segments[value][2],
              backgroundColor: color,
              width: 20,
              height: 80,
              marginRight: -50,
              marginTop: 0
            }
          ]}
        />
      </View>

      <View style={[styles.segment, { opacity: segments[value][6], backgroundColor: color, margin: 5 }]} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
        <View
          style={[
            styles.segment,
            {
              opacity: segments[value][5],
              backgroundColor: color,
              width: 20,
              height: 80,
              marginLeft: -20,
              marginTop: 0
            }
          ]}
        />
        <View
          style={[
            styles.segment,
            {
              opacity: segments[value][3],
              backgroundColor: color,
              width: 20,
              height: 80,
              marginRight: -50,
              marginTop: 0
            }
          ]}
        />
      </View>

      <View style={[styles.segment, { opacity: segments[value][4], backgroundColor: color, margin: 5 }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 70,
    marginLeft: 30
  },
  segment: {
    borderRadius: 5,
    width: 80,
    height: 20,
    marginHorizontal: 2
  }
})

const SegmentClock = ({ color = 'white' }) => {
  const [Clock, setClock] = useState()
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      const hour = date.getHours().toString().split('')
      const minute = date.getMinutes().toString().split('')
      // const second = date.getSeconds().toString().split('')

      setClock(
        <View style={{ transform: [{ scale: 0.8 }] }}>
          <View
            style={{
              flexDirection: 'row',
              transform: [{ rotate: '90deg' }]
            }}
          >
            <SevenSegment color={color} value={hour[1] ? hour[0] : 10} />
            <SevenSegment color={color} value={hour[1] ? hour[1] : hour[0]} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              width: '100%',
              flexDirection: 'row',
              opacity: date.getSeconds() % 2 === 0 ? 1 : 0.2
            }}
          >
            <View style={{ backgroundColor: color, width: 25, height: 25, borderRadius: 10 }}></View>
            <View style={{ backgroundColor: color, width: 25, height: 25, borderRadius: 10 }}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              transform: [{ rotate: '90deg' }]
            }}
          >
            <SevenSegment color={color} value={minute[1] ? minute[0] : 10} />
            <SevenSegment color={color} value={minute[1] ? minute[1] : minute[0]} />
          </View>
        </View>
      )
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return Clock
}

export default SegmentClock
