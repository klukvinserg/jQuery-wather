$(document).ready(function () {
  let lat;
  let lon;
  let nameCity = 'Lviv';

  getData();

  function getData() {
    $.ajax(`https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=1aab5e68991c14e08d5124684d9d0936`, {
        method: 'GET'
      }
    ).always(function (data, textStatus, jqXHR) {
      if (textStatus === 'error') {
        funDel();
      } else if (textStatus === 'success') {
        $('#day').css('display', 'block');
        $('#day').css('display', 'block');
        $('#daily').css('display', 'flex');
        $('#result').css('display', 'none');

        lat = data.coord.lat;
        lon = data.coord.lon;

        let currentHours = new Date().getHours();
        if (currentHours < 10) {
          currentHours = '0' + currentHours;
        }

        let currentMinutes = new Date().getMinutes();
        if (currentMinutes < 10) {
          currentMinutes = '0' + currentMinutes;
        }

        let currentSeconds = new Date().getSeconds();
        if (currentSeconds < 10) {
          currentSeconds = '0' + currentSeconds;
        }

        $('.city').text(`${data.name}, ${data.sys.country}`);
        $('.date').html(`${currentHours}:${currentMinutes}:${currentSeconds}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${new Date().toLocaleDateString()}`);
        $('.describe').text(`${data.weather[0].main}`);
        $('.image').html(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`);
        $('.temperature-inner').text(Math.round(data.main.temp - 273));
        $('.wind-inner').text(`${data.wind.speed} `);
        $('.humidity-inner').text(`${data.main.humidity}`);
        $('.pressure-inner').text(`${data.main.pressure} `);

        getDataDay();
      }
    });
  }

  $('.teal').on('click', function () {
    nameCity = $('#search').val();

    getData();

    $('#search').val('');
    let delActive = $('label');
    delActive[0].className = '';
  });

  function getDataDay() {
    $.ajax(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&%20exclude=hourly&appid=1aab5e68991c14e08d5124684d9d0936`, {
        method: 'GET',
      }
    ).always(function (data, textStatus, jqXHR) {
      if (textStatus === 'error') {
        funDel();
      } else if (textStatus === 'success') {
        $('#daily').empty();

        for (let i = 0; i < 5; i++) {
          let currentDay = new Date(data.daily[i + 1].dt * 1000).getDate();

          if (currentDay < 10) {
            currentDay = '0' + currentDay;
          }

          let currentMonth = new Date(data.daily[i + 1].dt * 1000).getMonth() + 1;

          if (currentMonth < 10) {
            currentMonth = '0' + currentMonth;
          }

          let currentYear = new Date(data.daily[i + 1].dt * 1000).getFullYear();

          $('#daily').append(`<div class="day-weather">
            <div class="day-name">${new Date(data.daily[i + 1].dt * 1000).toString().split(' ')[0]}</div>
            <div class="day-date">${currentDay}/${currentMonth}/${currentYear}</div>
            <img src="https://openweathermap.org/img/wn/${data.daily[i + 1].weather[0].icon}@2x.png">
            <div class="day-description">${data.daily[i + 1].weather[0].main}</div>
            <div class="day-temp">${Math.round(data.daily[i + 1].temp.day - 273)} <span>&deg;C</span></div> 
            </div>`);
        }
      }
    });
  }

  function funDel() {
    $('#day').css('display', 'none');
    $('#day').css('display', 'none');
    $('#daily').css('display', 'none');
    $('#result').css('display', 'block');
  }
});
