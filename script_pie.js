
// TO MAKE PIE-CHART

// GETTING CONTINENTWISE DATA FROM API
const getContinentData = ()=>{
    fetch("https://disease.sh/v3/covid-19/continents")
    .then((response)=>{
        return response.json();
    }).then((data)=>{
        // console.log(data);
        let pieData = buildPieData(data);
        buildPie(pieData);
    })
}

// CREATING ARRAY OF DATA
const buildPieData = (data)=>{
    let pieData = [];

    //creating array of cases
    for(let i=0; i<=5; i++){
        // let newCases = {
        //     x: date,
        //     y: data.cases[date]
        // }
        pieData.push(data[i].cases);
    }
 
    // console.log(pieData);
    return pieData;
}

// CREATING PIE-CHART AND STYLING
const buildPie = (pieData)=>{
    var ctx = document.getElementById('pie-chart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            labels: ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Australia/Oceania'],
            
            datasets: [{
                // label: 'Cases',
                backgroundColor: ['#FF0000','#DDA0DD', '#7CFC00', '#FFFF00', '#A52A2A', '#0000FF'],
                borderColor: '#008000',
                borderWidth: 1,
                data: pieData
                }]
            },

            options: {
            title: {
                display: true,
                text: 'Continental Comparison',
                fontSize:25,
                responsive:true,
                maintainAspectRatio:false
            }
        }
    });
}
        