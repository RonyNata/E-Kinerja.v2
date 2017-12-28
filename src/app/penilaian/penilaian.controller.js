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
            response = response.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
            for(var i = 0; i < response.length;i++){
              var date = new Date(response[i].tanggalDibuatMilis);
              response[i].tglPengiriman = EkinerjaService.IndonesianDateFormat(date);
              response[i].tglPengiriman += " pukul " + date.getHours() + ":" + date.getMinutes();
            }
            vm.laporanbawahan = response;
          }, function(errResponse){

          })
      }

      vm.terima = function(kdSurat, isPejabat){debugger
        if(isPejabat == 1)
            $state.go('perintahpejabatterusan', {
              "kdSurat": kdSurat
            });
          else if(isPejabat == 2)
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
              openSurat(kdHistory);
            }, function(errResponse){

            })
        }

      function openSurat(kdSurat){
        PenilaianService.OpenSurat(kdSurat).then(
          function(response){debugger
            getLaporanBawahan();
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