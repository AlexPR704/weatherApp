// Get current date
var today = new Date();
var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
// submit event for search area
$('#searchCity').submit(function(e){
    e.preventDefault();    
    var userInput = $('#userInput').val().trim();
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput},us&units=imperial&APPID=7b9695deb2d779cbc206d6186ef5f288`;    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var icon = $('<img>').attr('src', iconUrl);
        var card = $('<div>').addClass('card');
        var body = $("<div>").addClass('card-body');
        var head = $("<h4>").addClass('card-title').text(response.name + ' (' + date + ')').append(icon);
        var temp = $("<p>").addClass('card-text').text('Temperature: ' + response.main.temp + '°F');
        var humid = $("<p>").addClass('card-text').text('Humidity: ' + response.main.humidity + '%');
        var wind = $("<p>").addClass('card-text').text('Wind Speed: ' + response.wind.speed + 'mph');
        body.append(head, temp, humid, wind);
        card.append(body);
        $('#displayBox').prepend(card);
    });
    $("#userInput").val('');
})