
// TO MAKE LINE GRAPH

// Getting historical data of covid-19 from using API
const getHistoricalData = ()=>{
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=90")
    .then((response)=>{
        // console.log(response);
        return response.json();
    }).then((data)=>{
        // console.log(data);
        let chartData = buildChartData(data);
        buildChart(chartData);
    })
}

// Collecting data to insert into line-chart
const buildChartData = (data)=>{
    let chartData = [];
    let chart1 = [];
    let chart2 = [];
    let chart3 = [];

    //creating array of cases
    for(let date in data.cases){
        let newDataCases = {
                    x: date,
                    y: data.cases[date]
                }
            chart1.push(newDataCases);
        }
    chartData.push(chart1);

    //creating array of recovered
    for(let date in data.recovered){
        let newDataRecovered = {
                x: date,
                y: data.recovered[date]
            }
        chart2.push(newDataRecovered);
    }
    // console.log(chartData);
   chartData.push(chart2);

   //creating array of deaths
    for(let date in data.deaths){
            let newDataDeaths= {
                x: date,
                y: data.deaths[date]
            }
        chart3.push(newDataDeaths);
    }
    chartData.push(chart3);

    return chartData;
}

// TO BUILD LINE-CHART using data and styling line-chart
const buildChart = (chartData)=>{
    
    var timeFormat = 'MM/DD/YY';
    var ctx = document.getElementById('line-chart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset and styling of line-chart
       
        data: {
            datasets: [
                {
                    label: 'Cases',
                    backgroundColor: '#cc1034',
                    fill:false,
                    borderColor: '#008000',
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius:4,
                    pointHoverBackgroundColor:'#008000',
                    data: chartData[0]
                },
                {
                    label: 'Recovered',
                    backgroundColor: '#7FD922',
                    fill:false,
                    borderColor: '#4B0082',
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius:4,
                    pointHoverBackgroundColor:'#4B0082',
                    data: chartData[1]
                }, 
                {
                    label: 'Deaths',
                    backgroundColor: '#fa5575',
                    fill:false,
                    borderColor: '#8B0000',
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius:4,
                    pointHoverBackgroundColor:'#8B0000',
                    data: chartData[2]
                }
            ]
        },

        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index',
                intersect: false,
                displayColors: true
            },
            title: {
                display: true,
                text: 'Historical Comparison',
                showLines: false,
                fontSize:25 
            },
            elements: {
                line: {
                    tension: 0 // disables bezier curves
                }
            },
            scales: {
                xAxes: [{
                    gridlines: {
                        display:false
                    },
                    type: "time",
                    time: {
                        format: timeFormat,
                        tooltipFormat: "ll"
                    }, 
                    scaleLable: {
                        display: true,
                        lableString: 'Date'
                    }

                }],
                yAxes: [{
                    gridlines: {
                        display:false
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return numeral(value).format('0a');
                        }
                    }
                }]
            }
        }
    });
}

