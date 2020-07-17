

const todayDate = new Date();
const keyTerm = "Corona virus";
const newsKey = "310b220b06474f1caabbf44b75108943";
const getNewsData = ()=>{
    var url = 'http://newsapi.org/v2/top-headlines?' +
          'q=Covid-19&' +
          'from=2020-07-16&' +
          'sortBy=popularity&' +
          'apiKey=310b220b06474f1caabbf44b75108943';
          
var req = new Request(url);

fetch(url, {
    headers: {"Access-Control-Allow-Origin":"*",
    "contenty-type": "Application/json"}
})
    .then(function(response) {
       console.log(response.json());
    })
};