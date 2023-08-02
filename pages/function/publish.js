import Paho from 'paho-mqtt'

function publish(client, destination, data, err) {
  const message = new Paho.Message(JSON.stringify(data))
  message.destinationName = destination
  try {
    client.send(message)
  } catch (error) {
    console.log(error)
    err(error)
  }
}

export default publish
