const si = require('./systeminformation')
function getNetwork(){
  return new Promise(async (resolve, reject) => {
      // let ip = await getNetworkIP();
      si.networkInterfaces().then(data => {
        // console.log(data)
          data.map((val)=>{
            console.log(val)
          })
      }).catch(error => {
          reject();
      });
  })
}

getNetwork().then(d => console.log(d))