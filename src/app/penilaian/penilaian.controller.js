(function(){
	'use strict';

	angular.module('eKinerja').controller('PenilaianController', PenilaianController);

	function PenilaianController(EkinerjaService,
                                 PenilaianService,
                                 PenugasanService,
                                 TemplateSuratPerintahService,
                                 $scope,
                                 $state,
                                 $uibModal,
                                 $document,
                                 DashboardService,
                                 $window,
                                 API,
                                 TemplateSuratKeputusanService,
                                 TemplateSuratDinasService,
                                 TemplateLaporanService,
                                 TemplateTelaahanStaffService,
                                 TemplateSuratUndanganService,
                                 TemplateSuratPengantarService,
                                 TemplateSuratEdaranService,
                                 TemplateMemorandumService,
                                 TemplateSuratKuasaService,
                                 TemplateSuratKeteranganService,
                                 TemplateNotaDinasService,
                                 TemplateBeritaAcaraService){
		var vm = this;
    	vm.loading = true;

      getLaporanBawahan();
      getPerintahHistory();

      function getLaporanBawahan(){
        PenilaianService.GetLaporanBawahan($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
          function(response){debugger
            // response = response.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
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
          switch(laporan.kdJenisSurat){
            case 1: $state.go('laporan', {
                          "kdSuratBawahan": kdSurat
                        }); break;
            case 4: getDocumentPengumuman(laporan); break;
            case 5: getDocumentSuratDinas(laporan); break;
            case 6: getDocumentEdaran(laporan); break;
            case 7: getDocumentKeputusan(laporan); break;
            case 10: getDocumentPengantar(laporan); break;
            case 13: getDocumentUndangan(laporan); break;
            case 12: getDocumentSuratTugas(laporan); break;
            case 14: getDocumentTelaahanStaff(laporan); break;
            case 15: getLaporanLain(laporan); break;
            default: if(isPejabat == 1)
                        $state.go('perintahpejabatterusan', {
                          "kdSurat": kdSurat
                        });
                      else if(isPejabat == 2)
                        $state.go('perintahnonpejabatterusan', {
                          "kdSurat": kdSurat
                        });break;
          }
      }

      function getDocumentKeputusan(laporan){
        // laporan.loading = true;
        PenilaianService.GetDataKeputusan(laporan.kdSurat).then(
          function(response){
            vm.data = response;debugger
            var doc = TemplateSuratKeputusanService.template(vm.data);
            laporan.loading = false;
            pdfMake.createPdf(doc).open();
            // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
            //   openSurat(laporan.kdSurat);
          }, function(errResponse){

          })
      };

      function getDocumentEdaran(laporan){
        // laporan.loading = true;
        PenilaianService.GetDataEdaran(laporan.kdSurat).then(
          function(response){
            vm.data = response;debugger
            var doc = TemplateSuratEdaranService.template(vm.data);
            laporan.loading = false;
            pdfMake.createPdf(doc).open();
            // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
            //   openSurat(laporan.kdSurat);
          }, function(errResponse){

          })
      };

      function getDocumentUndangan(laporan){
        // laporan.loading = true;
        PenilaianService.GetDataUndangan(laporan.kdSurat).then(
          function(response){
            vm.data = response;debugger
            var doc = TemplateSuratUndanganService.template(vm.data);
            laporan.loading = false;
            pdfMake.createPdf(doc).open();
            // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
            //   openSurat(laporan.kdSurat);
          }, function(errResponse){

          })
      };

      function getDocumentPengantar(laporan){
        // laporan.loading = true;
        PenilaianService.GetDataPengantar(laporan.kdSurat).then(
          function(response){
            vm.data = response;debugger
            var doc = TemplateSuratPengantarService.template(vm.data);
            laporan.loading = false;
            pdfMake.createPdf(doc).open();
            // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
            //   openSurat(laporan.kdSurat);
          }, function(errResponse){

          })
      };

        function getDocumentSuratDinas(laporan){
            // laporan.loading = true;
            PenilaianService.GetDataSuratDinas(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateSuratDinasService.template(vm.data);
                    laporan.loading = false;
                    pdfMake.createPdf(doc).open();
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentLaporan(laporan){
            // laporan.loading = true;
            PenilaianService.GetDataLaporan(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateLaporanService.template(vm.data);
                    laporan.loading = false;
                    pdfMake.createPdf(doc).open();
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentTelaahanStaff(laporan){
            // laporan.loading = true;
            PenilaianService.GetDataTelaahanStaff(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateTelaahanStaffService.template(vm.data);
                    laporan.loading = false;
                    pdfMake.createPdf(doc).open();
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

      vm.getDocument = function(laporan){
        laporan.loading = true;
        debugger
        switch(laporan.kdJenisSurat){
          case 0: getDocumentBeritaAcara(laporan); break;
          case 1: getDocumentLaporan(laporan); break;
          case 5: getDocumentSuratDinas(laporan); break;
          case 6: getDocumentEdaran(laporan); break;
          case 7: getDocumentKeputusan(laporan); break;
          case 8: getDocumentSuratKeterangan(laporan); break;
          case 9: getDocumentSuratKuasa(laporan); break;
          case 10: getDocumentPengantar(laporan); break;
          case 13: getDocumentUndangan(laporan); break;
          case 12: getDocumentSuratTugas(laporan); break;
          case 14: getDocumentTelaahanStaff(laporan); break;
          case 15: getLaporanLain(laporan); break;
          default: vm.getDocumentPerintah(laporan); break;
        }
      }

      function getLaporanLain(laporan){
        DashboardService.GetLaporanLain(laporan.namaFileTemplateLain, laporan.extensiFile, laporan.kdSurat).then(
          function(response){
            laporan.loading = false;debugger
            var landingUrl = API + 'get-template-lain-file-revisi/' + laporan.namaFileTemplateLain + '/' + laporan.extensiFile + '/' + laporan.kdSurat;
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
                    // response = response.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
                    for(var i = 0; i < response.length;i++){
                        var date = new Date(response[i].tanggalDibuatMilis);
                        response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date);
                        response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes();
                    }
                    vm.perintahHistory = response;
                    getMemorandumHistory();
                },function(errResponse){

                })
        }

        function getUndanganHistory(){ 
          PenilaianService.GetUndanganHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "surat undangan"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              vm.perintahHistory = vm.perintahHistory.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } ); 
            }) 
        } 

        function getPengumumanHistory(){ 
          PenilaianService.GetPengumumanHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "pengumuman"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getUndanganHistory();
            }) 
        }

        function getEdaranHistory(){ 
          PenilaianService.GetEdaranHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "surat edaran"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getPengumumanHistory();
            }) 
        }

        function getKeputusanHistory(){ 
          PenilaianService.GetKeputusanHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "surat keputusan"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getEdaranHistory();
            }) 
        }

        function getPengantarHistory(){ 
          PenilaianService.GetPengantarHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "surat pengantar"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getKeputusanHistory();
            }) 
        }

        function getBeritaAcaraHistory(){ 
          PenilaianService.GetBeritaAcaraHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "berita acara"; 
                  vm.perintahHistory.push(response[i]); 
              } 
            }) 
              getPengantarHistory();
        }

        function getLaporanHistory(){ 
          PenilaianService.GetLaporanHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "laporan"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getBeritaAcaraHistory();
            }) 
        }

        function getNotaDinasHistory(){ 
          PenilaianService.GetNotaDinasHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "nota dinas"; 
                  vm.perintahHistory.push(response[i]); 
              } 
            }) 
              getLaporanHistory();
        }

        function getSuratDinasHistory(){ 
          PenilaianService.GetSuratDinasHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "surat dinas"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getNotaDinasHistory();
            }) 
        }

        function getKeteranganHistory(){ 
          PenilaianService.GetKeteranganHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "surat keterangan"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getSuratDinasHistory();
            }) 
        }

        function getKuasaHistory(){ 
          PenilaianService.GetKuasaHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){ 
              for(var i = 0; i < response.length;i++){ debugger
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuatMilis = response[i].createdDate;
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "surat kuasa"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getKeteranganHistory();
            }) 
        }

        function getTelaahStaffHistory(){ 
          PenilaianService.GetTelaahStaffHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "telaahan staff"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getKuasaHistory();
            }) 
        }

        function getMemorandumHistory(){ debugger
          PenilaianService.GetMemorandumHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then( 
            function(response){debugger 
              for(var i = 0; i < response.length;i++){ 
                  var date = new Date(response[i].tanggalDibuatMilis); 
                  response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date); 
                  response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes(); 
                  response[i].suratPejabat = response.isSuratPejabat; 
                  response[i].jenisSurat = "memorandum"; 
                  vm.perintahHistory.push(response[i]); 
              } 
              getTelaahStaffHistory();
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