angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('MostrarType', ['$http','$Global', function($http,$Global){
	return {
		mostrar : function(){
	//	return $http.post($Global.url+'/api/tipos');
		}
	}
}])

.factory('Empleado', ['$http','$Global', function($http, $Global){
	return {
		mostrar : function(){
		return $http.post($Global.url+'/api/empleado');
		}
	}
}])

.factory('Deudores', ['$http','$Global', function($http, $Global){
	return {
		mostrar : function(){
		return $http.post($Global.url+'/api/verDeudores');
		}
	}
}])

.factory('$Global', function() {
  return {
  	  url : 'http://gamecotools.com.mx',
      token : '',
      id : ''
  }
})

.factory('$Variables', function() {
  return {
  	  fondo : '',
  	  deuda : ''
  }
})

.factory('AlmacenaGastos', function() {
	var datos = angular.fromJson(window.localStorage['datos'] || '[]');
	 function guardarLocal(){
      window.localStorage['datos'] = angular.toJson(datos);
    }
  return {
  	 create: function(data){
		datos.push(data);
		guardarLocal();
  	 },
  	 update: function(index,data){
  		 datos[index] = data;
  		guardarLocal();
  	 },
  	 delete: function(index){
        datos.splice(index, 1);
  	 },
  	 mis_gastos : datos 
  }
}) 

.factory('Login', function() {
	var user = angular.fromJson(window.localStorage['user'] || '[]');
	 function guardarLocal(){
      window.localStorage['user'] = angular.toJson(user);
    }
  return {
  	  almacenar : function(usuarios){
           user = usuarios;
			guardarLocal();
		},
		usuarios : user
  }
})