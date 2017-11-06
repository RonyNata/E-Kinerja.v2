(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TemplateController', TemplateController);

    
    function TemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance) {
      	var vm = this;

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();