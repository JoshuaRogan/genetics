import { useEffect } from 'react';
import IndexPage from '../components/wrapper';




function HomePage() {
  useEffect(() => {
    const worker = new Worker('/workers/generationWorker.js');

    worker.addEventListener('message', function(e) {
      const data = JSON.parse(e.data);
      console.log(data);

        // const returned = $.parseJSON(e.data); //EVERYTHING MUST BE VALID JSON (DOUBLE QUOTES)
        //
        // if(returned.hasOwnProperty("type")){
        //     if(returned.type == "results-allele"){
        //         // console.log(returned.results);
        //        popGen.htmlutil.chartDOM.workerFinished(returned.results);
        //     }
        //     else if(returned.type =="results-genotype"){
        //         popGen.htmlutil.chartDOM.genotype = true;
        //         popGen.htmlutil.chartDOM.nextGraphType = 'addLine';
        //         popGen.htmlutil.chartDOM.clearGraph();
        //         popGen.htmlutil.chartDOM.clearLegend();
        //         popGen.htmlutil.chartDOM.workerFinished(returned.AA);
        //         popGen.htmlutil.chartDOM.workerFinished(returned.Aa);
        //         popGen.htmlutil.chartDOM.workerFinished(returned.aa);
        //     }
        //     else if(returned.type == "message"){
        //         console.log(returned.message);
        //     }
        //     else if(returned.type == "error"){
        //         console.log(returned.message);
        //     }
        // }

    }, false);

    worker.postMessage({"cmd":"initGeneration"});
    worker.postMessage({"cmd":"run"});


  }, []);


  return <IndexPage>
    <div>Welcome to Next.js!</div>
  </IndexPage>
}

export default HomePage
