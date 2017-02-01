angular.module('app.controllerPrestamos', [])

.controller('menuCtrl', ['$scope', '$stateParams', '$ionicActionSheet', '$state', '$controller',
function ($scope, $stateParams, $ionicActionSheet, $state, $controller ) {

      $controller('gastoCtrl',{$scope : $scope });

     $scope.optionGastos = function() {

         var hideSheet = $ionicActionSheet.show({
           buttons: [
             { text: 'Gasto Nuevo' },
             { text: 'Ver Mis Gastos' }
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
               return $scope.showGastos();
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

      $scope.sesion = function(){
        $state.go('gastosGameco');
      }
}])
   
.controller('prestamoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', 'Mensaje', 'AlmacenaPrestamos',
function ($scope, $stateParams, $ionicPopup, $state, Mensaje, AlmacenaPrestamos) {
  // "url": $Global.url+"/api/prestamos",
   $scope.prestar = function(){
   	  if($scope.aquien == null | $scope.cuanto == null){
          Mensaje.Error('Necesitas Agregar A Quien y Cuanto'); 
   	  }else if($scope.aquien == "" | $scope.cuanto == ""){
          Mensaje.Error('Necesitas Agregar A Quien y Cuanto'); 
        }else{ 
   	  	     
             var prestamo = {};
              if(AlmacenaPrestamos.mis_prestamos==[]){
               prestamo['id']= 0;
              }else{
               prestamo['id'] = AlmacenaPrestamos.mis_prestamos.length;
              }
              prestamo['nombre'] = $scope.aquien;
              prestamo['cantidad'] = $scope.cuanto;
              AlmacenaPrestamos.create(prestamo);
              $scope.aquien = "";
              $scope.cuanto = "";
             	Mensaje.success('Prestamo Realizado');
              $state.go('menu'); 
   	  }
   }

}])
   
.controller('abonoCtrl', ['$scope', '$stateParams', 'Deudores', '$Global', '$ionicPopup', '$state', 'ActualizarTodo', 'Mensaje', 'AlmacenaAbonos',
function ($scope, $stateParams, Deudores, $Global, $ionicPopup, $state, ActualizarTodo, Mensaje, AlmacenaAbonos) {
     
    	 $scope.deudores = ActualizarTodo.deudores;
        
    $scope.cuantoDebe = function(mySelect){

    	var array = JSON.parse("[" + mySelect + "]");
    	$scope.datos = array[0] ;
    	$scope.prestamo = $scope.datos.id;
       
       if (!AlmacenaAbonos.mis_abonos.length == 0) {
           for (var i = 0; i < AlmacenaAbonos.mis_abonos.length; i++) {
                 if (AlmacenaAbonos.mis_abonos[i].prestamo_id==$scope.prestamo) {
                  $scope.datos.debe = $scope.datos.debe - AlmacenaAbonos.mis_abonos[i].cuanto;
                  $scope.deuda = $scope.datos.debe;     
                 }else{
                  $scope.deuda = $scope.datos.debe;
                 }
              }
       }else{
         $scope.deuda = $scope.datos.debe;
       }
    }

    $scope.abonar = function(){
        if($scope.datos == null | $scope.cuanto == null){
            Mensaje.Error('Seleccione Deudor e Ingrese Cantidad de Abono');
        }else{ 
        	if($scope.cuanto > $scope.deuda){
			       Mensaje.Error('El Valor de Abono no Puede Ser Mayor a la Deuda');
        	}else{ 
        		     if($scope.cuanto == $scope.deuda){
                         $scope.activo = 0;
        		     }else{
                         $scope.activo = 1;
        		     }
		    	         
                  var abono = {};
                    abono['activo'] = $scope.activo;
                    abono['prestamo_id'] = $scope.prestamo;
                    abono['cuanto'] = $scope.cuanto;

                    AlmacenaAbonos.create(abono);

                    $scope.deuda = "";
                    $scope.cuanto= "";
                    if($scope.mySelect){
                      $scope.mySelect = $scope.mySelect[0];
                    }
                    
		                $state.go('menu');
		             
          	}
        }
    }
 
}])