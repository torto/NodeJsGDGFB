var io = io();

window.onload = function() {
    
    io.on('arduino', function(data) {
        var valor = document.querySelector('#valor');
        valor.innerHTML = data;
        console.log(data);
    });
};