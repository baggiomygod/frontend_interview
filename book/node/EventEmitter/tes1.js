const EventEmitter = require("events");

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter()

myEmitter.once('newListener', (e, listenr) => {
  if (e === 'event') {
    myEmitter.on('event', () => {
      console.log('B')
    })
  }
})

myEmitter.on('event', () => {
  console.log('A')
})

myEmitter.emit('event')