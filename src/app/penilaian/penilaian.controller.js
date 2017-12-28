(function(){
	'use strict';

	angular.module('eKinerja').controller('PenilaianController', PenilaianController);

	function PenilaianController(EkinerjaService, PenilaianService, PenugasanService, TemplateSuratPerintahService, 
    $scope, $state, $uibModal, $document, DashboardService, $window){
		var vm = this;
    	vm.loading = true;

      getLaporanBawahan();
      getPerintahHistory();

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

      vm.terima = function(laporan, kdSurat, isPejabat){debugger
        if(laporan.kdJenisSurat == 15)
          openTeruskanTemplate(laporan);
        else{
          if(isPejabat == 1)
              $state.go('perintahpejabatterusan', {
                "kdSurat": kdSurat
              });
            else if(isPejabat == 2)
              $state.go('perintahnonpejabatterusan', {
                "kdSurat": kdSurat
              });
        }
      }

      vm.getDocument = function(laporan){
        laporan.loading = true;
        switch(laporan.kdJenisSurat){
          case 15: getLaporanLain(laporan); break;
          default: vm.getDocumentPerintah(laporan); break;
        }
      }

      function getLaporanLain(laporan){
        DashboardService.GetLaporanLain(laporan.namaFileTemplateLain, laporan.extensiFile).then(
          function(response){
            laporan.loading = false;
            var landingUrl = 'http://10.2.1.32:8080/api/get-template-lain-file-revisi/' + laporan.namaFileTemplateLain + '/' + laporan.extensiFile;
            $window.location.href = landingUrl;
            getLaporanBawahan();

          }, function(errResponse){
            laporan.loading = false;
            getLaporanBawahan();
            // EkinerjaService.showToastrError("Gagal Mengambil Data");
          })
      }

      vm.getDocumentPerintah = function(laporan){
          // laporan.loading = true;
          PenugasanService.GetDataPerintah(laporan.kdSurat).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratPerintahService.template(vm.data);
              laporan.loading = false;
              pdfMake.createPdf(doc).open();
              if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                openSurat(laporan.kdSurat);
            }, function(errResponse){

            })
        };

      function openSurat(kdSurat){
        PenilaianService.OpenSurat(kdSurat).then(
          function(response){debugger
            getLaporanBawahan();
          }, function(errResponse){

          })
      }

        function getPerintahHistory(){
            PenugasanService.GetNaskahPenugasanPerintah($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
                function(response){debugger
                    response = response.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
                    for(var i = 0; i < response.length;i++){
                        var date = new Date(response[i].tanggalDibuatMilis);
                        response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date);
                        response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes();
                    }
                    vm.perintahHistory = response;
                },function(errResponse){

                })
        }

      function openTeruskanTemplate(laporan, parentSelector) {
          var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/penilaian/teruskanTemplate/teruskanTemplate.html',
              controller: 'TeruskanTemplateController',
              controllerAs: 'uptempterus',
              // windowClass: 'app-modal-window',
              // size: 'lg',
              appendTo: parentElem,
              resolve: {
                  template: function () {
                      return laporan;
                  }
              }
          });

          modalInstance.result.then(function () {
            getLaporanBawahan();
          }, function () {

          });
      };

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