angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('ActualizarTodo', ['$http','$Global', 'Mensaje', function($http, $Global, Mensaje){
	var datos = angular.fromJson(window.localStorage['tipo'] || '[]');
	 function guardarTipos(){
      window.localStorage['tipo'] = angular.toJson(datos);
     }

  var prestamos = angular.fromJson(window.localStorage['prestamo'] || '[]');
   function guardarPrestamos(){
      window.localStorage['prestamo'] = angular.toJson(prestamos);
     }
     
	return {
		ejecutar : function(){
      var bandera = false;
    	 	 $http.post($Global.url+'/api/tipos').success(function(response){
                 datos = response;
                 guardarTipos();
             return Mensaje.success('Se Actualizo Tipos de Gastos');
                
    	 	 })
     $http.post($Global.url+'/api/verDeudores').success(function(data){
             prestamos = data;
             guardarPrestamos();
             return Mensaje.success('Se Actualizo Prestamos');
                
             
     });
		},
		tipos_gastos : datos,
    deudores : prestamos,
    clear : function(){
      datos = angular.fromJson('[]');
                 guardarTipos();
      prestamos = angular.fromJson('[]');
             guardarPrestamos();
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
  	 delete: function(id){
		    datos.splice(id,1);
		    for (var i = 0; i < datos.length; i++) {
		    	datos[i].id = i;
		    }
        guardarLocal();
  	 },
  	 clear: function(valor){
        datos = angular.fromJson('[]');
        guardarLocal();
  	 },
  	 mis_gastos : datos 

  }
}) 

.factory('Mensaje', function($ionicPopup,$ionicLoading) {
	
  return {
  	  Error : function(valor){
  	  	return   $ionicPopup.alert({
                   title: 'Error',
                   template: valor,
                   buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                 }); 
  	  },
  	  loading : function(){
  	  	return $ionicLoading.show({
		        template: 'Cargando...',
		        duration: 2000
		        })
  	  },
  	  confirm : function(valor){
  	  	return $ionicPopup.confirm({
	             title: 'Eliminar',
	             template: valor
	           });
  	  },
      success : function(valor){
        return $ionicPopup.alert({
           title: 'Exito',
           template: valor,
           buttons: [{ text: 'OK', type: 'button-positive' }]
        });
      }
  }
})

.factory('AlmacenaPrestamos', function() {
  var prestamos = angular.fromJson(window.localStorage['prestamos'] || '[]');
   function guardarLocal(){
      window.localStorage['prestamos'] = angular.toJson(prestamos);
     }
     
  return {
     create: function(data){
        prestamos.push(data);
        guardarLocal();
     },
     clear: function(valor){
        prestamos = angular.fromJson('[]');;
        guardarLocal();
     },
     mis_prestamos : prestamos 

  }
})

.factory('AlmacenaAbonos', function() {
  var abonos = angular.fromJson(window.localStorage['abonos'] || '[]');
   function guardarLocal(){
      window.localStorage['abonos'] = angular.toJson(abonos);
     }
     
  return {
     create: function(data){
        abonos.push(data);
        guardarLocal();
     },
     clear: function(valor){
        abonos = angular.fromJson('[]');;
        guardarLocal();
     },
     mis_abonos : abonos 

  }
}) 