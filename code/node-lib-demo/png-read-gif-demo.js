const GIFEncoder = require('gifencoder');
const encoder = new GIFEncoder(300, 200);
const pngFileStream = require('png-file-stream');
const fs = require('fs');
// const urlArr = [
//   'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/1.png',
//   'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/2.png',
//   'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/3.png',
//   'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/4.png',
//   'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/5.png',
//   'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/6.png',
//   'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/7.png',
//   'https://7463-tcb-smrmjz7hefb960-5dute445ae8c3-1312836830.tcb.qcloud.la/tmp/8.png',
// ]
const stream = pngFileStream('./files/*.png')
  .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
  .pipe(fs.createWriteStream('gif_png.gif'));
 
stream.on('finish', function () {
  console.log('finished')
  // Process generated GIF
});