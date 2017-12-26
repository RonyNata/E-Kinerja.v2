(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('LihatTreeInstruksiController', LihatTreeInstruksiController);

    
    function LihatTreeInstruksiController(EkinerjaService, $scope, kdSurat, PenugasanService, $uibModalInstance) {
      	var vm = this;
        PenugasanService.GetTree(kdSurat).then(
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