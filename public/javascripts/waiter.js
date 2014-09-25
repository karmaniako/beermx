var ntable = "w";

var orders;

var socket = io('http://localhost:3000');

socket.on('ROOM_CNN',function(data){
    data = {table: ntable}
	socket.emit('ROOM_CNN', data);
});

socket.on('MSG',function(data){
	console.log(data);
})

//When the client order beer:
socket.on('BEERPLX', function(data){

console.log("Esto se enviara: "+data.table)
    //orders[data.table].push(Date(Now));
    //or:
    //addTodo(data);
    var scope = angular.element(document.getElementById("waiter")).scope();
   
    scope.$apply(        
        scope.addTodo(data)
    )
    

    console.log(orders);
});


///////////
//ANGULAR//
///////////

angular.module('todoApp', [])
  .controller('TodoController', ['$scope', function($scope) {
    $scope.todos = [{table:'0', repeat:0, date: dateFormat(), done:true}];

    $scope.addTodo = function(data) {
        //Buscar repetidos
        console.log("addTodo")
        
        var repeat = false;

        var addthis = {
            table: data.table,
            repeat:1,
            date: dateFormat(),
            done:false
          }
        console.log("Table recept: "+ data.table);
          
        angular.forEach($scope.todos, function(todo) {
          console.log(todo);
          //considence between data order & :
          if (todo.table===data.table) {
            todo.repeat++;
            todo.date=dateFormat();
            repeat=true;
          }
        });

        if (!repeat) {
          console.log("ya jala, awebO!")
          $scope.todos.unshift(addthis);
        }

    };

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
  }]);

//FUNCTIONS
function dateFormat() {
  var meses= new Array("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic")
  var d = new Date();

  var dt = d.getDate();
  var mes = meses[d.getMonth()+1];
  var dia = d.getDay();
  var hora = d.getHours();
  var min = d.getMinutes();
  var seg = d.getSeconds();
  
  var fecha = mes+" "+dia+" - "+hora+":"+min+":"+seg;
  return fecha;
}