<template>
  <div id="weather-app" :class="changeBack">
    <main>
      <div class="search-box">
        <input type="text"
               class="search-bar"
               placeholder="Search..."
               v-model="query"
               @keyup.enter="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.weather != 'undefined'">
        <div class="location-box">
          <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
          <div class="date">{{dateBuilder()}}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{Math.round(weather.main.temp)}}</div>
          <div class="weather">{{weather.weather[0].main}}</div>
        </div>

        <div class="weather-recommendation">
          <div class="recommendation">
            {{rec}}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import {ref, computed, onMounted} from "vue";


  const api_key = '0d7120298153165cc6b1a6b6e6ee2b01';
  const url_base = "https://api.openweathermap.org/data/2.5/";
  const query = ref('Bishkek');
  const weather = ref({});
  const changeBack = ref('');
  const rec = ref('');

  const fetchWeather = ()=>{
    fetch(`${url_base}weather?q=${query.value}&units=metric&appid=${api_key}`)
        .then(res=>{
          return res.json();
        }).then(setResults);
  }

  const setRec = (num)=>{
    if(num >= 5 && num <= 10){
      rec.value = "Погода прохладная, поэтому рекоммендую надеть осеннюю куртку, джинсы и кроссовки";
    }
    else if(num > 10 && num <= 20){
      rec.value = "Погода теплая, поэтому можно надеть даже футболку или легкую кофту, штаны и кроссовки";
    }
    else if(num > 20){
      rec.value = "Погода жаркая, поэтому рекоммендую надеть футболку и шорты";
    }
    else if(num <= 4 && num > -5){
      rec.value = "На улице явно зима, поэтому рекоммендую надеть зимнюю куртку, утепленные штаны и зимние кроссовки";
    }
    else if(num <= -5){
      rec.value = "На улице уже очень холодно, поэтому рекоммендую надеть зимнюю куртку, утепленные штаны, зимние перчатки и зимние сапоги. Берегите себя!))";
    }
    else rec.value = ''
  }

  const setBackClass = (results) =>{
    if(typeof results.weather != 'undefined' && results.weather[0].main == 'Clear'){
      changeBack.value = 'sun';
    }
    else if(typeof results.weather != 'undefined' && results.weather[0].main == 'Rain'){
      changeBack.value = 'rain';
    }
    else if(typeof results.weather != 'undefined' && results.weather[0].main == 'Snow'){
      changeBack.value = 'snow';
    }
    else if(typeof results.weather != 'undefined' && results.weather[0].main == 'Mist'){
      changeBack.value = 'mist';
    }
    else changeBack.value = '';
  }

  const setResults = (results)=>{
    weather.value = results;
    setBackClass(results);
    setRec(Math.round(results.main.temp));
  }

  onMounted(()=>{
    fetchWeather();
  })


  const dateBuilder =  ()=> {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
</script>

<style scoped>
  #weather-app{
    background-image: url("@/Assets/winter.jpg");
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
  }

  #weather-app.sun{
    background-image: url("@/Assets/sun.jpg");
  }

  #weather-app.snow{
    background-image: url("@/Assets/Snow.jpg");
  }

  #weather-app.rain{
    background-image: url("@/Assets/rain2.jpg");
  }

  #weather-app.mist{
    background-image: url("@/Assets/mist.jpg");
  }

  main{
    padding: 30px 30px;
    min-height: 100vh;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75));
  }

  .search-box{
    width: 100%;
    margin-bottom: 30px;
  }

  .search-box .search-bar{
    width: 50%;
    display: block;
    margin: 0 auto;
    padding: 15px;

    background-color: rgba(255,255,255,0.5);
    transition: 0.4s;
  }

  .search-box .search-bar:focus{
    background-color: rgba(255,255,255,0.7);
  }

  .location-box .location{
    color: white;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0,0,0,0.25);
    margin-bottom: 10px;
  }

  .location-box .date{
    color: white;
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    font-style: italic;
  }

  .weather-box{
    text-align: center;
  }

  .weather-box .temp{
    display: inline-block;
    padding: 10px 25px;
    color: white;
    font-size: 102px;
    font-weight: 900;

    text-shadow: 3px 6px rgba(0,0,0,0.25);
    margin: 30px 0;

  }

  .weather-box .weather{
    color: white;
    font-size: 48px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0,0,0,0.25);
  }

  .weather-recommendation {
  display: flex;
    justify-content: center;
    margin: 70px 0;
  }
  .recommendation{
    display: inline-block;
    padding: 20px 25px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    width: 700px;
    border-radius: 5px;
    background-color: rgba(255,255,255,0.7);
    transition: 0.4s;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  }
</style>