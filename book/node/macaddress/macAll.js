const md = require('./macaddress')
const _ = require('./lodash')
md.all().then((all) => {
  let mac = ''
  console.log('all:', all)
  for (let key in all) {
    mac += `${all[key]['mac']}_`
  }
  console.log(mac.substring(0, mac.length - 1))

  const macs = _.sortBy(all, (a) => a.mac)
  console.log(macs[0].mac)
})

