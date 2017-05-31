var form = $('#form'),
    pdvList = $('#pdv_list ul'),
    socket = io();

form.on('submit', function(event) {
  event.preventDefault();

  $.post('/', {
    pdv: {
      codigo: $('#pdv_codigo').val(),
      nombre: $('#pdv_nombre').val(),
      direccion: $('#pdv_direccion').val(),
      area: $('#pdv_area').val(),
      rango: $('#pdv_rango').val(),
      latitud: $('#pdv_latitud').val(),
      longitud: $('#pdv_longitud').val(),
      cadena: $('#pdv_cadena').val(),
      distrito: $('#pdv_distrito').val()
    }
  });
});

socket.on('connect', function() {
  console.log('socket:connect');
});

socket.on('data', function(data) {
  pdvList.append('<li>' + data.pdv.nombre + '</li>');
  console.log('socket:data', data);
});