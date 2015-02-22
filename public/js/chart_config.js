$(document).ready(function() {
    /*********************************************************CANVAS JS CONFIG********************************************************/
    if ($('#graph-canvas').length) {
        //Build data for canvasjs
        var data = [];
        var dataSeries = {
            type: "line",
            color: "rgba(255, 255, 255, 0.75)"
        };
        var dataPoints = [];
        for (var i = 0; i < 1; i++) {
            dataPoints.push({
                x: i,
                y: 0
            });
        }
        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);


        chart = new CanvasJS.Chart("graph-canvas", {
            zoomEnabled: true,
            exportEnabled: true,
            backgroundColor: "rgba(200, 54, 54, 0.0)",
            title: {
                text: "",
                fontColor: "rgba(255, 255, 255, 0.8)",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontWeight: 300
            },
            axisX: {
                title: "Generation",
                titleFontColor: "white", 
                // titleFontSize: 22, //Automatically calculated for responsive design
                labelFontColor: "rgba(255, 255, 255, 0.2)"Z,
                labelFontSize: 14,
                labelAngle: 0,
                gridThickness: 1,
                gridColor: "rgba(255, 255, 255, 0.2)",
                lineColor: "rgba(255, 255, 255, 0.2)",
                tickColor: "rgba(255, 255, 255, 0.2)"
            },
            axisY: {
                title: "Frequency of the A allele", 
                titleFontColor: "white",
                // titleFontSize: 22, //Automatically calculated for responsive design
                labelFontColor: "rgba(255, 255, 255, 0.2)",
                minimum: 0,
                maximum: 1,
                labelFontSize: 14,
                includeZero: false,
                gridThickness: 1,
                gridColor: "rgba(255, 255, 255, 0.2)",
                lineColor: "rgba(255, 255, 255, 0.2)",
                tickColor: "rgba(255, 255, 255, 0.2)"
            },
            data: data
        });

        chart.render();


    }
    /*********************************************************CANVAS JS********************************************************/
}) //Document ready 