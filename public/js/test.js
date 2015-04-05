var worker0 = new Worker('/js/dowork.js');
var worker1 = new Worker('/js/dowork.js');
var worker2 = new Worker('/js/dowork.js');
var worker3 = new Worker('/js/dowork.js');

worker0.addEventListener('message', function(e) {
  console.log('Worker 0 said: ', e.data);
}, false);
worker0.postMessage('GO!'); // Send data to our worker.

// worker1.addEventListener('message', function(e) {
//   console.log('Worker1 said: ', e.data);
// }, false);
// worker1.postMessage('GO!'); // Send data to our worker.

// worker2.addEventListener('message', function(e) {
//   console.log('Worker2 said: ', e.data);
// }, false);
// worker2.postMessage('GO!'); // Send data to our worker.

// worker3.addEventListener('message', function(e) {
//   console.log('Worker3 said: ', e.data);
// }, false);
// worker3.postMessage('GO!'); // Send data to our worker.
