//Namespaces
var popGen = popGen || {};
popGen.population = popGen.population || {};
popGen.generations = popGen.generation || {};

importScripts("/js/popGen/popGen.population.js")
importScripts("/js/popGen/popGen.generation.js")

onmessage = function(e) {
  console.log('Message received from main script');
  var generations = new popGen.generations(100, 1000, 0.500); 
  generations.buildRandomSamples(); 
  postMessage(generations.toString());
  console.log('Finished Working');
}



