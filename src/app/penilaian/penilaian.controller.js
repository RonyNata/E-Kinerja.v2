(function(){
	'use strict';

	angular.module('eKinerja').controller('PenilaianController', PenilaianController);

	function PenilaianController(EkinerjaService, PenilaianService, PenugasanService, TemplateSuratPerintahService, 
    $scope, $state, $uibModal, $document){
		var vm = this;
    	vm.loading = true;

      getLaporanBawahan();

      function getLaporanBawahan(){
        PenilaianService.GetLaporanBawahan($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
          function(response){debugger
            vm.laporanbawahan = response;
          }, function(errResponse){

          })
      }

      vm.terima = function(kdSurat, isPejabat){
        if(isPejabat)
            $state.go('perintahpejabatterusan', {
              "kdSurat": kdSurat
            });
          else
            $state.go('perintahnonpejabatterusan', {
              "kdSurat": kdSurat
            });
      }

      vm.getDocumentPerintah = function(kdHistory, idx){
          vm.laporanbawahan[idx].loading = true;
          PenugasanService.GetDataPerintah(kdHistory).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratPerintahService.template(vm.data);
              vm.laporanbawahan[idx].loading = false;
              pdfMake.createPdf(doc).open();
            }, function(errResponse){

            })
        }

      vm.tolak = function(data, parentSelector){
        var item = angular.copy(data);
        var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/penilaian/alasan/alasan.html',
          controller: 'AlasanController',
          controllerAs: 'alasan',
          // size: size,
          appendTo: parentElem,
          resolve: {
            items: function () {
              return item;
            }
          }
        });

        modalInstance.result.then(function () {
          EkinerjaService.showToastrSuccess("Laporan Telah Ditolak");
          getLaporanBawahan();
           // vm.selected = selectedItem;
        }, function () {
          // showToastrFailed('menambahkan data');
          // $log.info('Modal dismissed at: ' + new Date());
        });
      }
      	
  } 	 
})();