(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('DetailUrtugDpaController', DetailUrtugDpaController);

    
    function DetailUrtugDpaController(EkinerjaService, urtug, KontrakPegawaiService, isEselon4, 
      $uibModalInstance, $document, $uibModal, PengumpulanDataBebanKerjaService) {
      	var vm = this;

        getKegiatan();
        vm.isEselon4 = isEselon4;

        function getKegiatan(){
          var data = {
            "kdUrtug": urtug.kdUrtug,
            "kdJabatan": urtug.kdJabatan,
            "kdJenisUrtug": "KJU001",
            "tahunUrtug": urtug.tahunUrtug,
            "nipPegawai": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
          }
          // if(isEselon4)
          debugger
            // KontrakPegawaiService.GetUrtugKegiatan(data).then(
            PengumpulanDataBebanKerjaService.GetUrtugKegiatanByJabatan(data).then(
              function(response){
                vm.kegiatan = response; debugger
                for(var i = 0; i < response.length; i++)
                  vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].paguAnggaran);
              }, function(errResponse){

              }
            );
          // else
          //   KontrakPegawaiService.GetUrtugProgram(data).then(
          //     function(response){
          //       vm.kegiatan = response; debugger
          //       for(var i = 0; i < response.length; i++)
          //         vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].paguAnggaran);
          //     }, function(errResponse){

          //     }
          //   );
        }

        vm.openPejabat = function (item, parentSelector) {debugger
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/kontrakPegawai/detailPejabat/detailPejabat.html',
          controller: 'DetailPejabatController',
          controllerAs: 'urtugpejabat',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            kegiatan: function () {
              return item;
            }
          }
          });

          modalInstance.result.then(function () {

          }, function () {

          });
        };

        vm.save = function(){
          
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();