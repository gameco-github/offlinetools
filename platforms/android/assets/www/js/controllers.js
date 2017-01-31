angular.module('app.controllers', [])
  
.controller('fondoCtrl', ['$scope', '$stateParams', '$Global', '$state', '$ionicPopup', '$Variables', 'Empleado', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $Global, $state, $ionicPopup, $Variables, Empleado) {
      
    $scope.datosFondo = $Variables.fondo;
    Empleado.mostrar().success(function(data,status,headers,config){
     $scope.empleados = data;
    })
    .error(function(data,status,headers,config){
       });
     $scope.SelectEmpleado = function(mySelect){
          $scope.selectEmpleado = mySelect;
      }
    $scope.TrasferirFondo = function(){
       if($Global.id==$scope.selectEmpleado){
           var alertPopup = $ionicPopup.alert({
                       title: 'Error de Datos',
                       template: 'No Puedes auto Transferirte Fondo',
                       buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                     });
        }else{ 
            if(!$scope.selectEmpleado | !$scope.cantidad){       
               var alertPopup = $ionicPopup.alert({
                           title: 'Error de Datos',
                           template: 'Agrege A Quien y Cantidad',
                           buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                         });
            }else{
              if($scope.datosFondo.fondoActual < $scope.cantidad){
                var alertPopup = $ionicPopup.alert({
                           title: 'Error de Cantidad',
                           template: 'Fondo Insuficiente',
                           buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                         });
              }else{
               $scope.fondoCambio = $scope.datosFondo.fondoActual - $scope.cantidad;
          
             
                var settings ={ 
                    "url": $Global.url+"/api/transferir",
                    "method": "POST",
                     "data": {
                    "idFondo": $scope.datosFondo.id,
                    "fondoCambio": $scope.fondoCambio,
                    "idEmpleado": $scope.selectEmpleado,
                    "cantidad": $scope.cantidad,
                    "_token": $Global.token
                  }
                    
                  }
              $.ajax(settings).done(function (response) {
                if(response=="true"){
                   var alertPopup = $ionicPopup.alert({
                           title: 'Transferencia',
                           template: 'Transferencia Exitosa',
                           buttons: [{ text: 'OK' ,type: 'button-positive'}]
                         });
                   $state.go('menu');
                }else{
                   var alertPopup = $ionicPopup.alert({
                           title: 'Transferencia',
                           template: 'Ocurrio un Problema',
                           buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                         });
                }
              })

             }
            }
        }
    }
 
}])
   
.controller('gastosGamecoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$Global', '$state', '$ionicPopup', '$ionicLoading', '$ionicActionSheet', '$timeout', 'Login', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup, $Global, $state, $ionicPopup, $ionicLoading, $ionicActionSheet, $timeout, Login) {
   $scope.Entrar = function(){
    //eligio_arreola@hotmail.com
     if(!$scope.login){
      var alertPopup = $ionicPopup.alert({
                       title: 'Error de Ingreso',
                       template: 'Ingrese Usuario o Contraseña',
                       duration: 3000,
                       buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                     });

        }else{ 
        $ionicLoading.show({
        template: 'Cargando...',
        duration: 2000
        })
        var settings ={ 
            "url": $Global.url+"/api/auth_login",
            "method": "POST",
            "data": {
              "email": $scope.login.email,
              "password": $scope.login.password
            }
          }
        $.ajax(settings).done(function (response) {
          console.log(response);
           if (response['token']) {
                   $Global.token = response['token']['token'];
                   $Global.id = response['id']['id'];
                   $state.go('menu');
           }else{
            var alertPopup = $ionicPopup.alert({
                           title: 'Error de Ingreso',
                           template: 'Usuario o Contraseña Incorrecta',
                           buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                         });
           }
        });
       }
      }
    $scope.verLogin = function(){
        var settings ={ 
            "url": $Global.url+"/api/auth_login",
            "method": "POST",
            "data": {
              "email": $scope.login.email,
              "password": $scope.login.password
            }
          }
        $.ajax(settings).done(function (response) {

           Login.almacenar(response.usuarios);
           console.log(Login.usuarios);
        })
    }
   
   $scope.verUser = function(){
      console.log(Login.usuarios);
   }

}])
   
.controller('gastoCtrl', ['$scope', '$stateParams', 'MostrarType', '$Global', '$ionicPopup', '$state', '$Variables', 'AlmacenaGastos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, MostrarType, $Global, $ionicPopup, $state, $Variables, AlmacenaGastos) {
 
    $scope.agregarGasto = function(data){
      if(AlmacenaGastos.mis_gastos==[]){
         data['id']= 0;
      }else{
       data['id'] = AlmacenaGastos.mis_gastos.length;
      }
      AlmacenaGastos.create(data);
      $state.go('misGastos');
    }
   $scope.showGastos = function(){
     $state.go('misGastos');
   }


    $scope.checarGastos = function(){
       var settings ={ 
                "url": $Global.url+"/api/misgastos",
                "method": "POST",
                 "data": {
                "id": $Global.id,
                "_token": $Global.token
              }
                
              }
          $.ajax(settings).done(function (response) {
               if(response == "false"){
                       var alertPopup = $ionicPopup.alert({
                           title: 'Gasto',
                           template: 'No Tienes Gastos',
                           buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                         }); 
               }else{
                  $Global.mis_gastos = response; 
                  $state.go('misGastos');
               }
             
          })
    }

  $scope.checaFondo = function(){
            var settings ={ 
              "url": $Global.url+"/api/miFondo",
              "method": "POST",
              "data": {
                "id": $Global.id,
                "_token": $Global.token
              }
            }
          $.ajax(settings).done(function (response) {
            if(response=='false'){
                var alertPopup = $ionicPopup.alert({
                       title: 'Fondo',
                       template: 'No Tienes Ningun Fondo o Fondo insuficiente',
                       buttons: [{ text: 'OK' ,type: 'button-assertive'}]
                     });
            }else{
              $Variables.fondo = response;
              $state.go('fondo');
            }
          })
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
                $state.go('gastosGameco');
                $scope.reloadPage();
             } else {
               
             }
           });
        }
}])

.controller('misGastosCtrl', ['$scope', '$stateParams', '$Global', '$state', '$ionicPopup', '$controller', 'AlmacenaGastos', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $Global, $state, $ionicPopup, $controller, AlmacenaGastos) {
  $controller('gastoCtrl',{$scope : $scope });

     $scope.datos = AlmacenaGastos.mis_gastos;
     console.log( $scope.datos );
     $scope.eliminarGasto = function (id){

         var confirmPopup = $ionicPopup.confirm({
             title: 'Eliminar',
             template: 'Estas seguro de Eliminar el Gasto?'
           });
           confirmPopup.then(function(res) {
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