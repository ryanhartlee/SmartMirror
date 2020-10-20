$(document).ready(function(){
  startTime();
  weather();
});

//time variables
var hour;
var minute;
var dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//time functions
function startTime() {
  var today = new Date();
  minute = checkTime(today.getMinutes());
  hour = checkHour(today.getHours());
  console.log(hour + ":" + minute);
  $('#clock').html(hour + ":" + minute);
  var t = setTimeout(startTime, 15000);

  function checkTime(i) {
    if (i < 10) {
      i = ("0" + i);
    };
    return i;
  }

  function checkHour(j) {
    if (j > 12) {
      minute = minute + " PM";
      return (j - 12);
    } else if (j == 0){
      return (j + 12)
    } else {
      minute = minute + " AM";
      return j;
    }
  }

  var day = dow[today.getDay()];
  var month = months[today.getMonth()];
  var date = today.getDate();
  var year = today.getFullYear();
  $('#date').html(day + ', ' + month + ' ' + date + ', ' + year )
};

//weather functions
function weather() {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.297797&lon=-111.753848&exclude=minutely&appid=13df4d8adf4db36642b3c8fc40ed2b58')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    $('#conditionPic').append('<img src="http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@4x.png">');
    $('#temp').append('<h1>' + Math.trunc((data.current.temp - 273) * (9/5) + 32) + '</h1>');

    for (i = 3; i < 19; i += 3) {
      var time = new Date((data.hourly[i].dt*1000));
      let hour = time.getHours();
      if (hour > 12) {
        hour = hour - 12 + " PM";
      } else if (hour == 0) {
        hour = hour + 12 + " AM"
      } else {
        hour = hour + " AM"
      };
      $('#hourlyWeather').append('<td><img src="http://openweathermap.org/img/wn/' + data.hourly[i].weather[0].icon +'@2x.png"></td><td><table><tr><th><h5>' + hour + '</h5></th></tr><tr><td><h4>' + Math.trunc((data.hourly[i].temp + - 273) * (9/5) + 32) + ' F</h4></td></tr></table></td>');
    };

    for (i = 0; i < 7; i ++) {
      var time = new Date(data.daily[i].dt*1000);
      var day = dow[time.getDay()];
      var low = Math.trunc((data.daily[i].temp.min + - 273) * (9/5) + 32)
      var high = Math.trunc((data.daily[i].temp.max + - 273) * (9/5) + 32)
      //console.log(day, low, high)
      $('#dailyWeather').append('<tr><td><img src="http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon +'@2x.png"></td><td><table><tr><th><h3>' + ((day == dow[new Date().getDay()]) ? 'Today' : day) + '</h3></th></tr><tr><td><h5>H: ' + high + ' / L: ' + low + '</h5></td></tr></table></td></tr>');
    };
  })
};
