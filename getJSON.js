var getJSON = function (url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    var data;
    if (xmlhttp.readyState !== 4) {
      return;
    }   
    if (xmlhttp.status !== 200) {
      callback("response code: " + xmlhttp.status.toString(), null);
      return;
    }   
    try {
      data = JSON.parse(xmlhttp.responseText);
    } catch (e) {
      callback("parsing error: " + e.toString(), null);
      return;
    }   
    callback(null, data);
  };  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};
