(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('LihatTreeController', LihatTreeController);

    
    function LihatTreeController(EkinerjaService, $scope, kdSurat, AmbilDisposisiService, $uibModalInstance) {
      	var vm = this;
        AmbilDisposisiService.GetTree(kdSurat).then(
          function(response){
            debugger
            vm.path = response;
          }, function(errResponse){

          })

        vm.openPdf = function(kdSurat){
          $uibModalInstance.close(kdSurat);
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };
   	} 
})();