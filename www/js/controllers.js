angular.module('app.controllers', [])

.controller('fondoCtrl', ['$scope', '$stateParams', '$Global', '$state', '$ionicPopup', '$Variables', 'Empleado', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $Global, $state, $ionicPopup, $Variables, Empleado) {
      
   
}])
   
.controller('gastosGamecoCtrl', ['$scope', '$stateParams', '$Global', '$state',
  '$ionicActionSheet', '$timeout', '$rootScope', 'Mensaje', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $Global, $state, $ionicActionSheet, $timeout, $rootScope, Mensaje) {
   $scope.Entrar = function(){
    //eligio_arreola@hotmail.com
     if(!$scope.login || $scope.login.email == "" || $scope.login.password == ""){
          Mensaje.Error('Ingrese Los Datos Email y Cotraseña');
        }else{ 
            if($rootScope.online){
              Mensaje.loading();
                var settings ={ 
                    "url": $Global.url+"/api/auth_login",
                    "method": "POST",
                    "data": {
                      "email": $scope.login.email,
                      "password": $scope.login.password
                    }
                  }
                $.ajax(settings).done(function (response) {
                   if (response['token']) {
                           $Global.token = response['token']['token'];
                           $Global.id = response['id']['id'];
                           $scope.login.email = "";
                           $scope.login.password = "";
                           $state.go('actualizar');
                   }else{
                    Mensaje.Error('Su Email o Contraseña es Incorrecta');
                   }
                });
            }else{
              Mensaje.Error('Establesca Conexion a Internet');
            }
       }
      }
     
}])
   
.controller('gastoCtrl', ['$scope', '$stateParams', '$Global', '$ionicPopup', '$state', '$Variables', 'AlmacenaGastos', 'Mensaje', 'ActualizarTodo', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $Global, $ionicPopup, $state, $Variables, AlmacenaGastos, Mensaje, ActualizarTodo) {
 
     $scope.tipos = ActualizarTodo.tipos_gastos;
     $scope.SelectValue = function(mySelect){
            $scope.type = mySelect; 
    }

    $scope.agregarGasto = function(otro,cantidad){
       if (otro) {
          if(otro == ""){
             if($scope.type){
                otro = $scope.type;
             }else{
               Mensaje.Error('Seleccione o Escriba Tipo de Gasto');
             }
          }
      }else{
         if($scope.type){
            otro = $scope.type;
          }else{
           Mensaje.Error('Seleccione o Escriba Tipo de Gasto');
         }
       }
       if(otro){
          if(!cantidad){
             Mensaje.Error('Ingrese La Cantidad');
          }
       }
      
     if(cantidad){
           var data = {};
              if(AlmacenaGastos.mis_gastos==[]){
               data['id']= 0;
              }else{
               data['id'] = AlmacenaGastos.mis_gastos.length;
              }
              data['type'] = otro;
              data['spending'] = cantidad;

             AlmacenaGastos.create(data);

              if($scope.mySelect){
                      $scope.mySelect = $scope.mySelect[0];
              }
             $scope.otro = "";
             $scope.cantidad = "";

             Mensaje.success('Gasto Guardado');

      }
 }

   $scope.showGastos = function(){
      if (AlmacenaGastos.mis_gastos.length==0) {
         Mensaje.Error('No Existen Gastos');
      }else{
         $state.go('misGastos');    
      }
   }
}])

.controller('logoutCtrl', ['$scope', '$stateParams','$ionicPopup','$state', '$window',
    function ($scope, $stateParams,$ionicPopup,$state,$window) {
        $scope.reloadPage = function(){$window.location.reload('gastosGameco');}
        $scope.logout = function() {
          var confirmPopup = $ionicPopup.confirm({
             title: 'Salir',
             template: 'Estas seguro de Salir?'
           });
           confirmPopup.then(function(res) {
             if(res) {
                $state.go('menu');
                $scope.reloadPage();
             } else {
               
             }
           });
        }
}])

.controller('misGastosCtrl', ['$scope', '$stateParams', '$Global', '$state', '$ionicPopup', '$controller', 'AlmacenaGastos', 'Mensaje', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $Global, $state, $ionicPopup, $controller, AlmacenaGastos, Mensaje) {
  $controller('gastoCtrl',{$scope : $scope });

     $scope.datos = AlmacenaGastos.mis_gastos;
     $scope.eliminarGasto = function (id){

         Mensaje.confirm('Estas seguro de Eliminar el Gasto?').then(function(res) {
             if(res) {
                 AlmacenaGastos.delete(id);                  
             } else {
              
             }
           });


     }
      $scope.showPopup = function(data) {
       $scope.data = {}
       // An elaborate, custom popup
       var myPopup = $ionicPopup.show({
         template: ['<h5>Tipo '+data.type+'</h5><input type="text" ng-model="data.type" style="border:solid rgba(128, 123, 123, 0.21);">',

          '<h5>Cantidad $'+data.spending+'</h5><input type="number" ng-model="data.spending" style="border:solid rgba(128, 123, 123, 0.21);">'],

         title: 'Cambiar Gasto',
         scope: $scope,
         buttons: [
           { text: 'Cancel' },
           {
             text: '<b>Modificar</b>',
             type: 'button-positive',
             onTap: function(e) {
               if ($scope.data.type == null & $scope.data.spending == null) {
                 e.preventDefault();
               } else { 
                           if($scope.data.type!=null & $scope.data.spending == null){
                               $scope.data.spending = data.spending;
                            }else  if($scope.data.spending!=null & $scope.data.type == null){
                               $scope.data.type = data.type;
                            }
                          
                      $scope.data['id'] = data.id;
                     AlmacenaGastos.update(data.id,$scope.data);   
               }
             }
           },
         ]
       })
    };
}])

.controller('actualizarCtrl',function($scope, $stateParams, ActualizarTodo, AlmacenaGastos, $Global, Mensaje, AlmacenaPrestamos, AlmacenaAbonos){
    
    $scope.actualizar = function(){
        ActualizarTodo.ejecutar();
    }
    $scope.bandera = true;
    $scope.guardarCambios = function(){
      if($scope.bandera){

      
      if (AlmacenaGastos.mis_gastos.length == 0) {
        Mensaje.Error('No Existen Cambios Para Gastos');
      }else{
       var settings ={ 
                    "url": $Global.url+"/api/guardarCambios",
                    "method": "POST",
                    "data": {
                      "id": $Global.id,
                      "arregloGastos": AlmacenaGastos.mis_gastos,
                      "_token": $Global.token
                    }
                  }
                $.ajax(settings).done(function (response) {
                  
                   if(response=="true"){ 
                     AlmacenaGastos.clear();
                     Mensaje.success('Gastos Guardados');
                   }
                })
      }


      if (AlmacenaPrestamos.mis_prestamos.length == 0) {
        Mensaje.Error('No Existen Cambios Para Prestamos');
      }else{
        var prestamo = {
                      "url": $Global.url+"/api/prestamosOff",
                      "method": "POST",
                      "data": {
                        "id": $Global.id,
                        "arregloPrestamos": AlmacenaPrestamos.mis_prestamos,
                        "_token": $Global.token
                      } 
                    }
                  $.ajax(prestamo).done(function (response){
                    if(response == "true"){
                      AlmacenaPrestamos.clear();
                      Mensaje.success('Prestamos Almacenados');
                    }
                   
                  }) 
         }
       if (AlmacenaAbonos.mis_abonos.length == 0) {
          Mensaje.Error('No Existen Cambios para Abonos');
       }else{
         var abonos = {
                     "url": $Global.url+"/api/abonosOff",
                     "method": "POST",
                     "data": {
                        "id": $Global.id,
                        "arregloAbonos": AlmacenaAbonos.mis_abonos,
                        "_token": $Global.token
                     } 
                    }
                  $.ajax(abonos).done(function(response){
                     if(response == "true"){
                       AlmacenaAbonos.clear();
                       Mensaje.success('Abonos Almacenados');
                     }
                  })
       }
       $scope.bandera= false;
    }else{
      Mensaje.Error('Ya Se realizaron los Cambios');
    }
  }

})