module.exports = function (io) {

	io.on('connection', function (socket) {
		socket.emit('MSG',"Socket connection...")
		socket.emit('ROOM_CNN');

		console.log('New socket connect.');
	
		socket.on('ROOM_CNN', function(data){
			socket.join(data.table);
			socket.emit('MSG', "Connected to table " + data.table);
			console.log('Socket connected to table:' + data.table);
		});

		socket.on('BEERPLX', function (data){
			socket.emit('MSG', data);
		  	io.to('adm').emit('MSG', data);	


		  	io.to('w').emit('MSG', data);
		  	io.to('w').emit('BEERPLX',data);
		});

	});

}