
//GETTING NEWS FROM RAPID-API
const getNewsData = ()=>{
    fetch("https://bing-news-search1.p.rapidapi.com/news/search?count=20&freshness=Day&textFormat=Raw&safeSearch=Off&q=covid-19", {
	"method": "GET",
	"headers": {
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
                "x-rapidapi-key": "687cfa5f1cmshf1870281c5b6ae6p18c4bbjsn2ded67a68180",
                "x-bingapis-sdk": "true"
	        }
    })
    .then(response => {
        return response.json();
    })
    .then(data=>{
        newsDisplay(data);
    })
    .catch(err => {
	    console.log(err);
    });

};


// TO DISPLAY COLLECTION OF NEWS OF CORONA VIRUS .. 
const newsDisplay = (newsData)=>{
    const coronaEl = document.querySelector(".news-section");
    var htm = "";
    for (let i=0; i<newsData.value.length; i++){

        //FORMATTING DATE 
        var newsDate = new Date(newsData.value[i].datePublished);
        var dd = newsDate.getDate();
        var mm = newsDate.getMonth()+1;
        var yy = newsDate.getFullYear();

        var hh = newsDate.getHours();
        var min = newsDate.getMinutes();

        var myTime = hh+":"+min;
        var myDate = mm + "-"+ dd+"-"+yy;


        // SET DEFAULT IMAGE 
        if (newsData.value[i].image.thumbnail.contentUrl === null ){
            newsData.value[i].image.thumbnail.contentUrl = "./assets/images/covid-19-virus.jpg";
        }

        htm += `<div class="row news-card mt-2 mb-2">
                    <div class="col-sm-12 col-lg-3 news-image mt-1 mb-1">
                        <img src=${newsData.value[i].image.thumbnail.contentUrl}>
                    </div>
                    <div class="col-sm-12 col-lg-9 news-body mt-1 mb-1">
                            <h4 class="news-title">${newsData.value[i].name}</h4>
                            <p class="news-text">${newsData.value[i].description}</p>
                            <small class="text-muted">Published on: ${myDate} ${myTime}</small></br>
                            <a href=${newsData.value[i].url} class="btn btn-info btn-block" target="_blank"><span style="color:black">Source:</span> ${newsData.value[i].provider[0].name}</a>
                    </div>
                </div>
            `
    };
    
    coronaEl.innerHTML = htm;
}

