angular.module('app.controllerPrestamos', [])

.controller('menuCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$controller',
function ($scope, $stateParams, $ionicActionSheet, $state, $controller) {

      $controller('gastoCtrl',{$scope : $scope });

     $scope.optionGastos = function() {

         var hideSheet = $ionicActionSheet.show({
           buttons: [
             { text: 'Gasto Nuevo' },
             { text: '<div ng-controller="gastoCtrl" ng-click="checarGastos()">Ver Mis Gastos</div>' },
             { text: 'Transferir Fondo' }
           ],
          
           titleText: '<h4><b>Opciones</b></h4>',
           cancelText: 'Cancel',
           cancel: function() {
                // add cancel code..
              },
           buttonClicked: function(index) {

            if(index == 0){
              return $state.go('gasto');
            }else if(index == 1){
               return $scope.checarGastos();
            }else{
               return $scope.checaFondo();
            }

           }
        }); 
 
      };

       $scope.optionPrestamo = function() {

         var hideSheet = $ionicActionSheet.show({
           buttons: [
             { text: 'Prestar' },
             { text: 'Abonar' }
           ],
          
           titleText: '<h4><b>Opciones</b></h4>',
           cancelText: 'Cancel',
           cancel: function() {
                // add cancel code..
              },
           buttonClicked: function(index) {

            if(index == 0){
              return $state.go('prestamo');
            }else{
              return $state.go('abono');
            }

           }
        }); 
 
      };
}])
   
.controller('prestamoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$Global', '$state',
function ($scope, $stateParams, $ionicPopup, $Global, $state) {

   $scope.prestar = function(){
   	  if($scope.aquien == null | $scope.cuanto == null){
          var alertPopup = $ionicPopup.alert({
                           title: 'Prestamo',
                           template: 'Necesitas Agregar A Quien y Cuanto',
                           buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                         }); 
   	  }else{
   	  	 var settings ={ 
                    "url": $Global.url+"/api/prestamos",
                    "method": "POST",
                     "data": {
                    "user_id": $Global.id,
                    "nombre": $scope.aquien,
                    "cantidad": $scope.cuanto,
                    "_token": $Global.token
                  }
                    
                  }
              $.ajax(settings).done(function (response) {
                 if (response == 'true') {
                 	  var alertPopup = $ionicPopup.alert({
                           title: 'Prestamo',
                           template: 'Prestamo Realizado',
                           buttons: [{ text: 'OK' ,type: 'button-positive'}]
                         });
                 	  $scope.aquien ="";
                 	  $scope.cuanto ="";
                 	  $state.go('menu');
                 
                 }
              })
   	  }
   }

}])
   
.controller('abonoCtrl', ['$scope', '$stateParams', 'Deudores', '$Global', '$ionicPopup', '$state',
function ($scope, $stateParams, Deudores, $Global, $ionicPopup, $state) {
     
     Deudores.mostrar().success(function(data,status,headers,config){
    	 $scope.deudores = data;
   	 })
    .error(function(data,status,headers,config){
     
     });
    
    $scope.cuantoDebe = function(mySelect){

    	var array = JSON.parse("[" + mySelect + "]");
    	$scope.datos = array[0] ;
    	$scope.prestamo = $scope.datos.id;  
        $scope.deuda = $scope.datos.debe; 

    }

    $scope.abonar = function(){
        if($scope.datos == null | $scope.cuanto == null){
            var alertPopup = $ionicPopup.alert({
                       title: 'Error',
                       template: 'Seleccione Deudor e Ingrese Cantidad de Abono',
                       buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                   });
        }else{ 
        	if($scope.cuanto > $scope.deuda){
				var alertPopup = $ionicPopup.alert({
                       title: 'Error',
                       template: 'El Valor de Abono no Puede Ser Mayor',
                       buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                   });
        	}else{ 
        		     if($scope.cuanto == $scope.deuda){
                         $scope.activo = 0;
        		     }else{
                         $scope.activo = 1;
        		     }
		    		  var settings ={ 
		                    "url": $Global.url+"/api/abonar",
		                    "method": "POST",
		                     "data": {
		                    "user_id": $Global.id,
		                    "activo": $scope.activo,
		                    "prestamo_id": $scope.prestamo,
		                    "cuanto": $scope.cuanto,
		                    "_token": $Global.token
		                  }
		                    
		                  }
		              $.ajax(settings).done(function (response) { 
		                if(response == 'true'){
		                   var alertPopup = $ionicPopup.alert({
		                       title: 'Abono',
		                       template: 'El Abono se Agrego Correctamente',
		                       buttons: [{ text: 'OK' ,type: 'button-positive'}]
		                   });
		                   $scope.cuanto = "";
		                   $state.go('menu');
		                }
		              })
          	}
        }
    }

}])