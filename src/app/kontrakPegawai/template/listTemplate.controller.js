(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TemplateController', TemplateController);

    
    function TemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, $scope,
      $uibModal, $document, $state, urtug, isDPA, kdSurat, jenisNaskahPenugasan, PengumpulanDataBebanKerjaService) {
      	var vm = this;

        vm.isDPA = isDPA;
        vm.urtug = urtug;debugger

        vm.searchName = "";

        getAllTemplate();

        function getAllTemplate(){
          KontrakPegawaiService.GetAllTemplate().then(
            function(response){
              vm.template = response;
              vm.result = response;
            }, function(errResponse){

            })
        }

        vm.search = function(){
          vm.result = KontrakPegawaiService.SearchTemplate(vm.searchName, vm.template);
        }

        $scope.$watch('urtug', function(){
          // console.log($scope.deskripsi.length)
          if($scope.urtug != undefined){
            vm.urtug = PengumpulanDataBebanKerjaService.GetUrtugByyId(vm.list_urtug, $scope.urtug);
          }
        });

        getUrtugByJabatan();

        function getUrtugByJabatan(){
          vm.loading = true;
          KontrakPegawaiService.GetUrtugByNip($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              vm.list_urtug = response;
              vm.loading = false;
              // debugger
            }, function(errResponse){
              vm.loading = false;

            }
          )
        }

        vm.gotoTemplate = function(url){
          $uibModalInstance.close();
          console.log(url);
          $state.go(url, {
            "kdSurat": kdSurat,
            "jenisNaskah": jenisNaskahPenugasan,
            "tahun": vm.urtug.tahunUrtug,
            "kdUrtug": vm.urtug.kdUrtug
          });
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }

        vm.openUploadTemplate = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/kontrakPegawai/uploadTemplate/uploadTemplate.html',
                controller: 'UploadTemplateController',
                controllerAs: 'uptemp',
                // windowClass: 'app-modal-window',
                // size: 'lg',
                appendTo: parentElem,
                resolve: {
                    urtug: function () {
                        return urtug;
                    },
                    isDPA: function () {
                        return isDPA;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };
   	} 
})();