// Code modified from CodeAcademy's YouTube API course

// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseBlock = $("#response");
    $.each(response.items, function(i,item) {
        var d = new Date(Date.parse(item.start.dateTime));
        var newEvent = $('<div class="event">'+item.summary+'</div>').append('<div class="description">'+d.toDateString()+'</div>');
        responseBlock.append(newEvent);
    });
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('calendar', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyA3Y8YH229X35MEe9gpRXB6MCUeD-_ykZs');

    search();
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    var d = new Date();
    var timeString = ISODateString(d); // prints something like 2009-09-28T19:03:12Z
    var request = gapi.client.calendar.events.list({
        calendarId: 'haipjacob@gmail.com',
        maxResults: 10,
        timeMin: timeString,
        fields: "items(colorId,description,end,id,location,reminders,start,summary)",
        orderBy: "startTime",
        singleEvents: true
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}

function ISODateString(d) {
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z';
}

