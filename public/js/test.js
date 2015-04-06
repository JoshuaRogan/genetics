var worker0 = new Worker('/js/dowork.js');
var genWorker = new Worker('/js/webworkers/generationWorker.js');

genWorker.addEventListener('message', function(e) {
  console.log('Worker 0 said: ', e.data);
}, false);


genWorker.postMessage({'cmd':'initGeneration', 'populationSize': 1000, 'numGenerations': 1000, 'startingFrequency': .500}); // Send data to our worker.

//Setting all of the variables for testing
genWorker.postMessage({'cmd':'setVar', 'varName': 'selection-W', 'wAA': .3, 'wAa': .2, 'waa': .5}); 
genWorker.postMessage({'cmd':'setVar', 'varName': 'selection-DS', 'selectionCoef': .3, 'dominaceCoef': .2});
genWorker.postMessage({'cmd':'setVar', 'varName': 'mutation', 'mu': .0003, 'nu': .003}); 
genWorker.postMessage({'cmd':'setVar', 'varName': 'migration', 'migrationRate': .145, 'migrantAlleleFreq': .333}); 
genWorker.postMessage({'cmd':'setVar', 'varName': 'inbreeding', 'inbreedCoef': .255}); 
genWorker.postMessage({'cmd':'setVar', 'varName': 'assortative-mating', 'matingFreq': .99}); 
genWorker.postMessage({'cmd':'setVar', 'varName': 'population-bottleneck', 'generationStart': 3, 'generationEnd': 50, 'newPopulationSize': 500}); 

//Run the worker
genWorker.postMessage({"cmd":"run"}); // Run one of the generations 0 indexed 




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

