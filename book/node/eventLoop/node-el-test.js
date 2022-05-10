
function macroTask (index) { console.log('macroTask', index) }
// microTask: process.nextTick（node独有）, Promises
// MacroTask: script(整体代码), setTimeout, setInterval, setImmediate（node独有）, I/O, UI rendering
function start () {
  console.log('start')
  // 宏任务1
  setTimeout(() => { macroTask(1) }, 0)
  // 微任务1
  Promise.resolve(2).then(()=>{ // 放入微队列   1
    console.log('micro-task 1');
  });

  // 宏任务2
  setTimeout(() => { macroTask(2) }, 0)
  
  // 微任务2
  Promise.resolve(2).then(()=>{ // 放入微队列   1
    console.log('micro-task 2');
  });
  console.log('end')
}
start()