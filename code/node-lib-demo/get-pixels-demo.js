'use strict';
const GIFEncoder = require('gif-encoder');
const getPixels = require('get-pixels')

const {
  createCanvas,
  loadImage
} = require('canvas')
const fs = require('fs');
const path = require('path');
const https = require('https')
const {
  ndGetPixels,
} = require('ndarray-pixels');


const urlArr = [
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/1.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/2.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/3.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/4.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/1.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/2.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/3.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/4.png',
]

const gif = new GIFEncoder(300, 150);
// stream the results as they are available into myanimated.gif
var file = fs.createWriteStream(`pixels-gif${Date.now()}.gif`);
gif.pipe(file)
gif.writeHeader();
gif.setRepeat(0); // 0 for repeat, -1 for no-repeat
gif.setDelay(500); // frame delay in ms
gif.setQuality(10); // image quality. 10 is default.

gif.on('readable', async (buffer) => {
  console.log('readable:', gif.read());
})
gif.on('end', function () {
  console.log('end:');
});
var addToGif = async function (images, counter = 0) {
  // http + gfencoder
  try {
    const pixels = await getImgPixels(urlArr[counter])
    gif.addFrame(pixels.data)
   
    if (counter === images.length - 1) {
      gif.finish();
    } else {
      addToGif(images, ++counter);
    }
  } catch(err) {
    console.log("Bad image path", err)
  }
}

// http 请求图片资源，转为pixels（ndarray-pixels包实现）
function getImg(url, name) {
  const p = new Promise((resolve, reject) => {
    https.get(url, {
      encoding: null
    }, res => {
      const {
        statusCode
      } = res;
      if (statusCode !== 200) {
        reject('Request Failed.\n' + `Status Code: ${statusCode}`)
      }
      let img = []
      let size = 0
      // 将图片地址以【.】符号分割，取最后一项，即为格式后缀
      const _arr = url.split('.')
      const format = _arr[_arr.length - 1]
      // 如果没有传入图片名字，则使用随机数
      const _name = name ? name : 'image-' + Math.floor(Number(new Date()) * Number(Math.random()))
      res.on('data', chunk => {
        img.push(chunk)
        size += chunk.length
      })
      res.on('end', async () => {
        // 合并 Buffer
        const buffer = Buffer.concat(img, size)
        const bytesIn = new Uint8Array(buffer)
        const pixels = await ndGetPixels(bytesIn, 'image/png'); // Uint8Array -> ndarray
        resolve(pixels)
      })
    })
  })
  return p
}
function getImgPixels(url, name) {
  const p = new Promise((resolve, reject) => {
    getPixels(url, function(err, pixels) {
      if(err) {
        console.log("Bad image path")
      reject(err)
        return
      }
    resolve(pixels)
    })
  })
  return p
}

addToGif(urlArr)