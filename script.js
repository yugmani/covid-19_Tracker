
// TO INITIALIZE GOOGLE MAP WITH COVID-19 DATA

var map;
var infoWindow;
let coronaGlobalData;   // to be used in the function getCountriesData().
const worldwideSelection = {
    name:"worldwide",
    value: "www",
    selected: true
}

// Various mapstyles
var mapStyle = silverStyle;
// var mapStyle = mapRetro;
// var mapStyle = mapNavy;
// var mapStyle = mapAubergine


const mapCircles = [];
var casesTypeColors = {
    cases:'##cc1034',
    // active:'#9d80fe',
    recovered:'#7fd922',
    deaths:'#fa5575'
}

// INITIALIZING FUNCTIONS WHILE LOADING WINDOW
window.onload = () =>{
    getCountriesData();
    // buildChart();
    getHistoricalData();
    getContinentData();
    getWorldCoronaData();
    getNewsData();
}

// INITIALIZE GOOGLE MAP
const mapCenter = {
    lat:34.80746,
    lng:-4004796
}
function initMap() {
    // toggleStyle();
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom:2,
        styles: mapStyle
    });
    infoWindow = new google.maps.InfoWindow();
}

const changeDataSelection = (element, casesType)=>{
    // getWorldCoronaData();
    clearTheMap();
    showDataOnMap(coronaGlobalData, casesType);
    const cardEl = document.querySelectorAll('.card');
    // console.log(cardEl);
    for (let i=0; i<cardEl.length; i++){
        // console.log(cardEl[i]);
        // cardEl[i].classList.remove("active");
    }
//   element.classList.add("active");
}


const clearTheMap = ()=> {
    for(let circle of mapCircles){
        circle.setMap(null);
    }
}

// changing map center
const setMapCenter = (lat, long, zoom) =>{
    map.setZoom(zoom);
    map.panTo({
        lat: lat,
        lng: long
    });
}

const initDropdown = (searchList)=>{
    $('.ui.dropdown').dropdown({
        values:searchList,
        onChange: function(value, text){
            if(value !== worldwideSelection.value){
                getCountryData(value);
            } else {
                getWorldCoronaData();
            }
        }
    });
}

const setSearchList = (data)=>{
    let searchList = [];
    searchList.push(worldwideSelection);
    data.forEach((countryData)=>{
        searchList.push({
            name:countryData.country,
            value:countryData.countryInfo.iso3
        })
    })
    initDropdown(searchList);
}

const getCountryData = (countryIso) =>{
    const url = "https://disease.sh/v3/covid-19/countries/"+countryIso;
    fetch(url)
    .then((response)=>{
        return response.json()
    }).then((data)=>{
        setMapCenter(data.countryInfo.lat, data.countryInfo.long, 2);
        setStatsData(data);
    })
}


// const hideActiveState = (element)=>{
    
// }


// GETTING TOTAL WORLDWIDE CORONA DATA 
const getWorldCoronaData = ()=>{
    fetch("https://disease.sh/v2/all")
    .then((response)=>{
        return response.json()
    }).then((data)=>{
        setStatsData(data);
        setMapCenter(mapCenter.lat, mapCenter.lng, 2);
        buildChart(data);
    })
}

// Using numeral.js to format the number and then display them in HTML.
const setStatsData = (data)=>{
    let addedCases = numeral(data.todayCases).format('+0,0');
    let addedRecovered = numeral(data.todayRecovered).format('+0,0');
    let addedDeaths = numeral(data.todayDeaths).format('+0,0');
    let totalCases = numeral(data.cases).format('0.0a');
    let totalRecovered = numeral(data.recovered).format('0.0a');
    let totalDeaths= numeral(data.deaths).format('0.0a');

    //REFER NUMERAL.JS TO CAPITALIZE M OR K
    document.querySelector('.total-number').innerHTML = `${addedCases} Total`;
    document.querySelector('.recovered-number').innerHTML = `${addedRecovered} Total`;
    document.querySelector('.deaths-number').innerHTML = `${addedDeaths} Total`;
    document.querySelector('.cases-total').innerHTML = `${totalCases} Total`;
    document.querySelector('.recovered-total').innerHTML = `${totalRecovered} Total`;
    document.querySelector('.deaths-total').innerHTML = `${totalDeaths} Total`;
}


// SHOWING DATA ON GOOGLE-MAP
const showDataOnMap = (data, casesType="cases")=>{
    data.map((country)=>{
        let countryCenter = {
            lat: country.countryInfo.lat,
            lng: country.countryInfo.long
        }

        // CIRCLE-MARKER STYLING
        var countryCircle = new google.maps.Circle({
          strokeColor: casesTypeColors[casesType],
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: casesTypeColors[casesType],
          fillOpacity: 0.35,
          map: map,
          center: countryCenter,
          radius:country[casesType]
        //   radius: country.casesPerOneMillion * 15
        });

        mapCircles.push(countryCircle);


        // INSERT DATA INTO INFO-WINDOW AND STYLING
        // style="background-image:url(${country.countryInfo.flag});"
        var html = `
                <div class="info-container">
                    <div class="country-flag" > 
                        <img src="${country.countryInfo.flag}"></img>
                    </div>
                    <div class="info-name">
                        ${country.country}
                    </div>
                    <div class="info-confirmed">
                        Total: ${country.cases}
                    </div>
                    <div class="info-recovered">
                        Recovered: ${country.recovered}
                    </div>
                    <div class="info-deaths">
                        Deaths: ${country.deaths}
                    </div>
                </div>`
        var infoWindow = new google.maps.InfoWindow({
            content: html,
            position: countryCircle.center
        });

        // EVENT LISTENERS ON MOUSEOVER AND MOUSEOUT
        google.maps.event.addListener(countryCircle, 'mouseover', function() {
            // infoWindow.setContent(html);
            infoWindow.open(map);
          });

        google.maps.event.addListener(countryCircle, "mouseout", function(){
            infoWindow.close();
        })
        
    })
}


// GETTING DATA COUNTRYWISE COVID-19 DATA FROM API
const getCountriesData = ()=>{
    fetch("https://corona.lmao.ninja/v2/countries")
    .then((response)=>{
        // console.log(response);
        return response.json();
    }).then((data)=>{
        // console.log(data);
        coronaGlobalData = data;
        setSearchList(data);
        showDataOnMap(data);
        showDataInTable(data);
    })
}

// CREATING TABLE OF COUNTRYWISE DATA
const showDataInTable = (data) =>{
    var html = "";
    data.forEach((country) => {
        html += `
                <tr>
                    <td><img src=${country.countryInfo.flag}></td>  
                    <td>${country.country}</td>
                    
                    <td>${numeral(country.cases).format(0,0)}</td>
                </tr>`
    })
    document.getElementById("table-data").innerHTML = html;
}

