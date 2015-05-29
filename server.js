var http = require("http");
var app = require("./config/express")();
var io = require("socket.io");

var SerialPort = require("serialport").SerialPort;

var serialPort = new SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: require("serialport").parsers.readline("\n")
});

http = http.createServer(app);

io = io.listen(http);

var dataOld = 0;

io.on('connection', function(client) {
    console.log('Cliente conectou');

    serialPort.open(function(error) {
        if (error) {
            console.log('failed to open: ' + error);
        } else {
            console.log('open serial');
            serialPort.on('data', function(data) {
                if (data != dataOld) {
                    console.log('data received: ' + data);
                    client.emit('arduino', "valor: " + data);
                    dataOld = data;
                }

            });
        }
    });
});

http.listen(app.get('port'), function() {
    console.log('funcionando - porta: ' + app.get('port'));
});