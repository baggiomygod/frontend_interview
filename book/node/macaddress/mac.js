const md = require('./macaddress')
const _ = require('./lodash')

md.one().then(mac => {
  console.log('1:', mac)
})