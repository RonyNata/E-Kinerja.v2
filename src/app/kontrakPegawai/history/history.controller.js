(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('HistoryController', HistoryController);

    
    function HistoryController(EkinerjaService, KontrakPegawaiService, $uibModalInstance) {
      	var vm = this;

        getAllHistory();

        function getAllHistory(){
          KontrakPegawaiService.GetAllHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              vm.dataHistory = response;debugger
            }, function(errResponse){

            })
        }

        vm.getDocument = function(kdHistory){
          KontrakPegawaiService.GetHistory(kdHistory).then(
            function(response){
              debugger
            }, function(errResponse){

            })
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();