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
    console.log(response);
    return response.json();
})
.then(data=>{
    console.log(data);
    newsDisplay(data);
})
.catch(err => {
	console.log(err);
});

};


const newsDisplay = (newsData)=>{
    const coronaEl = document.querySelector(".corona-news");
    var htm = "";
    for (let i=0; i<2; i++){

        var newsDate = new Date(newsData.value[i].datePublished);
        console.log(newsDate);
        var dd = newsDate.getDate();
        var mm = newsDate.getMonth()+1;
        var yy = newsDate.getFullYear();

        var hh = newsDate.getHours();
        var min = newsDate.getMinutes();
        var myTime = hh+":"+min;

        var myDate = mm + "-"+ dd+"-"+yy;
        console.log(myDate);

        htm += `<div class="col-sm-12 col-lg-6 corona>
                    <div class="card">
                        <img src=${newsData.value[i].image.thumbnail.contentUrl}>
                        <div class="card-body">
                            <h4 class="card-title">${newsData.value[i].name}</h4>
                            <h6 class="card-text">${newsData.value[i].description}</h6>
                            <p class="text-muted">${myDate} ${myTime}</p></br>
                            <a href=${newsData.value[i].url} class="btn btn-primary btn-lg btn-block" target="_blank">${newsData.value[i].provider[0].name}</a>
                        </div>
                    </div>
                </div>
            `
    };
    // console.log(htm);
    
    coronaEl.innerHTML = htm;
}

