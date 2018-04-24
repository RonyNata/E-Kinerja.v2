(function() {
'use strict';

angular.
	module('eKinerja')
	.controller('LihatTreeController', LihatTreeController);


    function LihatTreeController(EkinerjaService, $scope, kdSurat, jenisTree, AmbilDisposisiService, $uibModalInstance) {
      	var vm = this;
        if(jenisTree)
          AmbilDisposisiService.GetTree(kdSurat).then(
            function(response){
              for(var i = 0; i < response.length; i++){
                  var date = new Date(response[i].tglPengirimanMilis);
                  response[i].tglPengiriman += " pukul " + date.getHours() + ":" + date.getMinutes();
              }
              debugger
              vm.path = response;
            }, function(errResponse){

            })
        else
          AmbilDisposisiService.GetTreeAtasan(kdSurat).then(
            function(response){
              for(var i = 0; i < response.length; i++){
                  var date = new Date(response[i].tglPengirimanMilis);
                  response[i].tglPengiriman += " pukul " + date.getHours() + ":" + date.getMinutes();
              }
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
