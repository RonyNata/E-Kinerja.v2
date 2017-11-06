(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TemplateController', TemplateController);

    
    function TemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, $state) {
      	var vm = this;

        getAllTemplate();

        function getAllTemplate(){
          KontrakPegawaiService.GetAllTemplate().then(
            function(response){
              vm.template = response;
            }, function(errResponse){

            })
        }

        vm.gotoTemplate = function(url){
          $uibModalInstance.close();
          $state.go(url);
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();