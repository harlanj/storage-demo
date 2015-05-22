(function() {
  var url = window.location.origin || (window.location.protocol +
            "//" + window.location.hostname +
            (window.location.port ? ':' + window.location.port: ''));

  var directories = document.getElementById('directories');

  var socket = io(url);

  function ls(data) {
    console.log(data);
    var span = document.createElement('li');
    span.setAttribute('class', 'list');

    var list = document.createElement('pre');
    list.innerHTML += data;

    span.appendChild(list);
    directories.insertBefore(span, directories.firstChild);
  }

  socket.on('output', ls);

  $('#1mb').click(function() {
    $.ajax({
      url: url + '/create',
      method: 'POST',
      data: { 'size': 1 },
      dataType: 'json',
      success: function(res) {
        console.log(res);
      }
    });
  });

  $('#20mb').click(function() {
    $.ajax({
      url: url + '/create',
      method: 'POST',
      data: { 'size': 20 },
      dataType: 'json',
      success: function(res) {
        console.log(res);
      }
    });
  });

  $('#100mb').click(function() {
    $.ajax({
      url: url + '/create',
      method: 'POST',
      data: { 'size': 100 },
      dataType: 'json',
      success: function(res) {
        console.log(res);
      }
    });
  });
}());