'use strict';
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');
const path = require('path');
var os = require('os');
console.log('获取操作系统平台： ', os.arch());

const encoder = new GIFEncoder(320, 240);
// stream the results as they are available into myanimated.gif
encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

encoder.start();
encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
encoder.setDelay(500); // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.

const urlArr = [
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/1.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/2.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/3.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/4.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/5.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/6.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/7.png',
  'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/8.png',
]
// use node-canvas
const canvas = createCanvas(320, 240);
const ctx = canvas.getContext('2d');

urlArr.forEach((u) => {
  // Draw cat with lime helmet
  loadImage(u).then((image) => {
    console.log('image:', image)
    ctx.drawImage(image, 0, 0, 300, 150)
    encoder.addFrame(ctx);
  if (index === urlArr.length - 1) {
    encoder.finish();
  }
  })
})

