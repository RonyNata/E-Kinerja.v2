(function(){
  'use strict';

  angular.module('eKinerja').controller('AmbilDisposisiController', AmbilDisposisiController);

  function AmbilDisposisiController(HakAksesService, EkinerjaService, AmbilDisposisiService,
    KontrakPegawaiService, $scope, $state, $uibModal, $document, $window, DashboardService, PengumpulanDataBebanKerjaService){
    var vm = this;
        vm.loading = true;

        vm.eselon = $.parseJSON(sessionStorage.getItem('credential')).eselon.split('.')[0].toLowerCase();

      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));
      vm.pegawai.role.role = vm.pegawai.role.role.toUpperCase();
      vm.isPejabat = EkinerjaService.isPejabatTinggi($.parseJSON(sessionStorage.getItem('credential')).eselon,
                                      $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja);
      vm.isPimpinan = EkinerjaService.isPimpinan($.parseJSON(sessionStorage.getItem('credential')).eselon,
                                      $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja);

      vm.checkRole = function(role){
          if(vm.pegawai.role.id == role)
              return true;
          else return false;
      };

        // getAllDisposisi();
        getHistoryDisposisi();

        function getAllDisposisi(){
          AmbilDisposisiService.GetAllDisposisi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              vm.jmlNotifDisposisiMasuk = 0;
              response = response.sort( function ( a, b ) { return b.tglPengirimanMilis - a.tglPengirimanMilis; } );
              for(var i = 0; i < response.length; i++){
                  var date = new Date(response[i].tglPengirimanMilis);
                  response[i].tglPengiriman += " pukul " + date.getHours() + ":" + date.getMinutes();
                  response[i].ketBaca = statusBaca(response[i].statusBaca);
                  if (response[i].statusBaca == 0){
                      vm.jmlNotifDisposisiMasuk += 1;
                  }
              }

              vm.dataHistory = response;debugger
              vm.loading = false;
              vm.dataHistory = vm.dataHistory.sort( function ( a, b ) { return b.tglPengirimanMilis - a.tglPengirimanMilis; } );
              vm.sortDisposisi = angular.copy(vm.dataHistory);
              pagingDisposisi();
            }, function(errResponse){

            })
        }

        function getDokumenDisposisi(kdLembarDisposisi, isOpenRead, statBaca){
          AmbilDisposisiService.GetDokumenDisposisi(kdLembarDisposisi).then(
            function(response){
              template(response);
              if(isOpenRead && statBaca == 0)
                DashboardService.ChangeRead('open-lembar-disposisi/', kdLembarDisposisi,
                  $.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
                  function(response){
                    getAllDisposisi();
                  }, function(errResponse){
                    
                  });
              getHistoryDisposisi();
            }, function(errResponse){
                  EkinerjaService.showToastrError('Terjadi Kesalahan');
            })
        }

        function getHistoryDisposisi(){
          AmbilDisposisiService.GetHistoryDisposisi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){debugger
              response = response.sort( function ( a, b ) { return b.tglPengirimanMilis - a.tglPengirimanMilis; } );
              for(var i = 0; i < response.length; i++){
                  var date = new Date(response[i].tglPengirimanMilis);
                  response[i].tglPengiriman += " pukul " + date.getHours() + ":" + date.getMinutes();
                  response[i].ketBaca = statusBaca(response[i].statusBaca);
              }
              vm.history = response;
              vm.history = vm.history.sort( function ( a, b ) { return b.tglPengirimanMilis - a.tglPengirimanMilis; } );
              vm.historyDisposisi = angular.copy(vm.history);
              pagingHistori();
            }, function(errResponse){

            })
        }

        if(vm.isPejabat)
          getDraft();
        function getDraft(){
          AmbilDisposisiService.GetDraftDisposisi($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            $.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){debugger
              vm.jmlNotifDrafDisposisi = 0;
              for(var i = 0; i < response.length; i++){
                  response[i].tglTerima = EkinerjaService.IndonesianDateFormat(new Date(response[i].tanggalPenerimaanSuratDisposisi));
                  if (!response[i].approvedBySekdin){
                      vm.jmlNotifDrafDisposisi += 1;
                  }
              }
              vm.draft = response;
              vm.draft = vm.draft.sort( function ( a, b ) { return b.tanggalPenerimaanSuratDisposisi - a.tanggalPenerimaanSuratDisposisi; } );
              vm.draftDispsosisi = angular.copy(vm.draft);
              pagingDraft();
            }, function(errResponse){

            })
        }

        // $window.localStorage['key'] = 'keuy';

        console.log($window.localStorage['key']);

        // if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
        //   vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
        //   debugger
        //   getAllDisposisi();
        // }
        // else
        PengumpulanDataBebanKerjaService.GetAllPegawaiByUnitKerja($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
        function(response){
          vm.list_pegawai = response;
          // sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
          getAllDisposisi();
          vm.loading = false;
        }, function(errResponse){

        })

      //   $scope.$watch('searchNameDisposisi', function(){
      //   // console.log($scope.deskripsi.length)
      //   if($scope.searchNameDisposisi != undefined){
      //     vm.dataLook = EkinerjaService.searchByDeskripsi($scope.searchNameDisposisi, vm.data_urtug);
      //   }else {
      //     vm.dataLook = vm.data_urtug;
      //   }
      //   paging();
      // });

        vm.openTemplate = function (uraianTugas, isDPA, surat, parentSelector) {
        var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/kontrakPegawai/template/listTemplate.html',
        controller: 'TemplateController',
        controllerAs: 'temp',
        // windowClass: 'app-modal-window',
        // size: 'lg',
        appendTo: parentElem,
            resolve: {
                urtug: function () {
                    return uraianTugas;
                },
                isDPA: function () {
                    return isDPA;
                },
                kdSurat: function(){
                    return surat.kdLembarDisposisi;
                },
                jenisNaskahPenugasan: function(){
                    return 1;
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {

        });
      };

        vm.sortDate = function(){
          vm.sortDisposisi = [];
          vm.historyDisposisi = [];
          vm.draftDispsosisi = [];

          for(var i = 0; i < vm.dataHistory.length; i++){
            if(vm.tanggal.getDate() == new Date(vm.dataHistory[i].tglPengirimanMilis).getDate() && 
               vm.tanggal.getMonth() == new Date(vm.dataHistory[i].tglPengirimanMilis).getMonth() &&
               vm.tanggal.getYear() == new Date(vm.dataHistory[i].tglPengirimanMilis).getYear())
               vm.sortDisposisi.push(vm.dataHistory[i]);
          }
          for(var i = 0; i < vm.history.length; i++){
            if(vm.tanggal.getDate() == new Date(vm.history[i].tglPengirimanMilis).getDate() && 
               vm.tanggal.getMonth() == new Date(vm.history[i].tglPengirimanMilis).getMonth() &&
               vm.tanggal.getYear() == new Date(vm.history[i].tglPengirimanMilis).getYear())
               vm.historyDisposisi.push(vm.history[i]);
          }
          for(var i = 0; i < vm.draft.length; i++){
            if(vm.tanggal.getDate() == new Date(vm.draft[i].tanggalPenerimaanSuratDisposisi).getDate() && 
               vm.tanggal.getMonth() == new Date(vm.draft[i].tanggalPenerimaanSuratDisposisi).getMonth() &&
               vm.tanggal.getYear() == new Date(vm.draft[i].tanggalPenerimaanSuratDisposisi).getYear())
               vm.draftDispsosisi.push(vm.draft[i]);
          }

          pagingDisposisi();
          pagingHistori();
          pagingDraft();

        }

        function pagingDisposisi(){
            $scope.filteredDataDisposisi = [];
            $scope.currentPageDisposisi = 0;
            $scope.numPerPageDisposisi = 5;
            $scope.maxSizeDisposisi = Math.ceil(vm.sortDisposisi.length/$scope.numPerPageDisposisi);
            function pageDisposisi(){
              $scope.pageDisposisi = [];
              for(var i = 0; i < vm.sortDisposisi.length/$scope.numPerPageDisposisi; i++){
                  $scope.pageDisposisi.push(i+1);
              }
            }
            pageDisposisi();
            $scope.padDisposisi = function(i){
              $scope.currentPageDisposisi += i;
            }

            $scope.maxDisposisi = function(){
              if($scope.currentPageDisposisi >= $scope.maxSizeDisposisi - 1)
                  return true;
              else return false;
            }

            $scope.$watch("currentPageDisposisi + numPerPageDisposisi", function() {
              var begin = (($scope.currentPageDisposisi) * $scope.numPerPageDisposisi)
              , end = begin + $scope.numPerPageDisposisi;

              $scope.filteredDataDisposisi = vm.sortDisposisi.slice(begin, end);
            });
          }

          function pagingHistori(){
            $scope.filteredData = [];
            $scope.currentPage = 0;
            $scope.numPerPage = 5;
            $scope.maxSize = Math.ceil(vm.historyDisposisi.length/$scope.numPerPage);
            function page(){
              $scope.page = [];
              for(var i = 0; i < vm.historyDisposisi.length/$scope.numPerPage; i++){
                  $scope.page.push(i+1);
              }
            }
            page();
            $scope.pad = function(i){
              $scope.currentPage += i;
            }

            $scope.max = function(){
              if($scope.currentPage >= $scope.maxSize - 1)
                  return true;
              else return false;
            }

            $scope.$watch("currentPage + numPerPage", function() {
              var begin = (($scope.currentPage) * $scope.numPerPage)
              , end = begin + $scope.numPerPage;

              $scope.filteredData = vm.historyDisposisi.slice(begin, end);
            });
          }

          function pagingDraft(){
            $scope.filteredDataDraft = [];
            $scope.currentPageDraft = 0;
            $scope.numPerPageDraft = 5;
            $scope.maxSizeDraft = Math.ceil(vm.draftDispsosisi.length/$scope.numPerPageDraft);
            function pageDraft(){
              $scope.pageDraft = [];
              for(var i = 0; i < vm.draftDispsosisi.length/$scope.numPerPageDraft; i++){
                  $scope.pageDraft.push(i+1);
              }
            }
            pageDraft();
            $scope.padDraft = function(i){
              $scope.currentPageDraft += i;
            }

            $scope.maxDraft = function(){
              if($scope.currentPageDraft >= $scope.maxSizeDraft - 1)
                  return true;
              else return false;
            }

            $scope.$watch("currentPageDraft + numPerPageDraft", function() {
              var begin = (($scope.currentPageDraft) * $scope.numPerPageDraft)
              , end = begin + $scope.numPerPageDraft;

              $scope.filteredDataDraft = vm.draftDispsosisi.slice(begin, end);
            });
          }

        vm.forward = function(kdLembarDisposisi){
          $state.go('perpindahandisposisi', {
            "kdSurat": kdLembarDisposisi
          });
        }

        vm.createDisposisi = function(){
          $state.go('perpindahan');
        }

        vm.disposisi = function(parentSelector){
          var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/penilaian/openUrtug/openUrtug.html',
              controller: 'OpenUrtugController',
              controllerAs: 'openurtug',
              // windowClass: 'app-modal-window',
              // size: 'lg',
              appendTo: parentElem,
              resolve: {
                  surat: function () {
                      return 0;
                  },
                  isUpload: function () {
                      return 1;
                  }
              }
          });

          modalInstance.result.then(function () {
          }, function () {

          });
        }

        function template(item){debugger
          if(item.targetjabatan && !vm.isDraft)
            var unitTarget = item.targeJabatanLembarDisposisiList[0].unitKerja.toUpperCase();
          else if(!vm.isDraft) var unitTarget = item.targetPegawaiLembarDisposisi[0].unitKerja.toUpperCase();
          else
            var unitTarget = $.parseJSON(sessionStorage.getItem('credential')).unit.toUpperCase();
          var pegawai = EkinerjaService.findPegawaiByNip(item.dari,vm.list_pegawai);
          var docDefinition = {
            pageSize: 'A4',
            content: [
                {
                    table:{
                        widths: ['50%', '*', '20%'],
                        body:[
                            [
                                {
                                    border: [true, true, true, false],
                                    text: [
                                        {text: 'PEMERINTAH KABUPATEN BEKASI\n',style: 'header'},
                                        {text: '' + unitTarget,style: 'header'}
                                    ],
                                    colSpan: 3
                                }, {}, {}
                            ],
                            [
                                {
                                    border: [true, false, true, false],
                                    stack:[
                                        {text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',style: 'header3'}
                                    ],
                                    margin: [130, 0, 130, 0],
                                    colSpan: 3
                                },{},{}
                            ],
                            [
                                {
                                    border: [true, false, true, false],
                                    stack:[
                                        {
                                            columns: [
                                                {width: '25%', text: 'Telp. (021) 89970696',style:'header3'},
                                                {width: '25%',text: 'Fax. (021) 89970064',style:'header3'},
                                                {width: '40%',text: 'email : diskominfo@bekasikab.go.id',style:'header3'}
                                            ]
                                        }
                                    ],
                                    margin: [70, 0, 10, 0],
                                    colSpan: 3
                                },{},{}
                            ],
                            [
                                {
                                    text: [
                                        {text: 'LEMBAR DISPOSISI',style: 'header'}
                                    ],
                                    colSpan: 3
                                }, {}, {}
                            ],
                            [
                                {
                                    text: [
                                        {text: 'Nomor Agenda/Registrasi : ', fontSize: 10},
                                        {text: '' + item.kdLembarDisposisi, fontSize: 10,bold: true}
                                    ]
                                },
                                {
                                    text: [
                                        {text: 'Sifat Disposisi : ', fontSize: 10},
                                        {text: [''], fontSize: 10, bold: true}
                                    ]
                                    ,colSpan: 2
                                },{}
                            ],
                            [
                                {
                                    text: [
                                        {text: 'Tanggal Penerimaan : ', fontSize: 10},
                                        {text: '' + item.tanggalPenerimaan, fontSize: 10, bold: true}
                                    ]
                                },
                                {
                                    text: [
                                        {text: 'Tanggal Penyelesaian : ', fontSize: 10},
                                        {text: '' + item.tglPenyelesaian, fontSize: 10, bold: true}
                                    ]
                                    ,colSpan: 2
                                },{}
                            ],
                            [
                                {
                                    fontSize: 10,
                                    table: {
                                        widths: [120, 5, '*'],
                                        body: [
                                            ['Tanggal dan Nomor Surat', ':',
                                                {
                                                    text: [
                                                        {text: '' + item.tanggalSuratDisposisi, bold: true},
                                                        {text: ' dan '},
                                                        {text: '' + item.noSuratDisposisi, bold: true}
                                                    ]
                                                }
                                            ],
                                            ['Dari', ':', {text: '' + item.dari, bold: true}],
                                            ['Perihal', ':', {text: '' + item.ringkasanIsi, bold: true}],
                                            ['Lampiran', ':', {text: '' + item.lampiran, bold: true}]
                                        ]
                                    },colSpan: 3, layout: 'noBorders'
                                },{},{}
                            ],
                            [
                                {
                                    text: 'ISI DISPOSISI',
                                    style: 'header4',
                                    alignment: 'center'
                                },
                                {
                                    text: 'DITERUSKAN KEPADA',
                                    style: 'header4',
                                    alignment: 'center',
                                    colSpan: 2
                                }
                            ],
                            [
                                {
                                    style: 'header5',
                                    alignment: 'justify',
                                    text: '' + item.isiDisposisi
                                },
                                {
                                    style: 'header5',
                                    ol: [],
                                    colSpan: 2
                                }
                            ]
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    bold: true,
                    fontSize: 14,
                    alignment: 'center'
                },
                header2: {
                    fontSize: 12,
                    alignment: 'center'
                },
                header3: {
                    fontSize: 10,
                    alignment: 'center'
                },
                nama_judul: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 12
                },
                judul_nomor: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 12
                },
                demoTable: {
                    color: '#000',
                    fontSize: 12
                },
                tandaTangan: {
                    color: '#000',
                    fontSize: 12,
                    alignment:'right'
                },
                header4: {
                    bold: true,
                    fontSize: 12
                },
                header5: {
                    fontSize: 12
                }
            }
          };

            if (item.tktKeamanan == 1) {
              docDefinition.content[0].table.body[4][1].text[1].text[0] += "Sangat Rahasia";
            }
            else if (item.tktKeamanan == 2) {
              docDefinition.content[0].table.body[4][1].text[1].text[0] += "Rahasia";
            }
            else if (item.tktKeamanan == 3) {
              docDefinition.content[0].table.body[4][1].text[1].text[0] += "Biasa";
            }

            if(item.targetjabatan)
              for(var i = 0; i < item.targeJabatanLembarDisposisiList.length; i++){
                docDefinition.content[0].table.body[8][1].ol.push(item.targeJabatanLembarDisposisiList[i].jabatan);
              }
            else 
              for(var i = 0; i < item.targetPegawaiLembarDisposisi.length; i++){
                docDefinition.content[0].table.body[8][1].ol.push(item.targetPegawaiLembarDisposisi[i].nama);
              }
            vm.openDps(docDefinition, item.kdLembarDisposisi);
          };



            $scope.openPdf = function(kdLembarDisposisi, isOpenRead, statBaca, isDraft) {
              var blb;
              vm.isDraft = isDraft;
              getDokumenDisposisi(kdLembarDisposisi, isOpenRead, statBaca);
              // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
              //     // turn buffer into blob
              //     blb = buffer;
              // });
              // blb = new Blob(blb);
              // console.log(vm.item.pembukaSurat);
            };

            vm.openDps = function (docs, kdSurat, parentSelector) {
              var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
              var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/disposisi/lihatPdf/lihatPdfDisposisi.html',
                controller: 'LihatPDFDisposisiController',
                controllerAs: 'pdfDisposisi',
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                  doc: function () {
                    return docs;
                  },
                  dokumen: function () {
                    return 'Disposisi';
                  },
                  surat: function () {
                    return kdSurat;
                  }
                }
              });

              modalInstance.result.then(function (kdSurat) {
                getDokumenDisposisi(kdSurat, 0, 1);
                // vm.selected = selectedItem;
              }, function () {
                // showToastrFailed('menambahkan data');
                // $log.info('Modal dismissed at: ' + new Date());
              });
            };

            $scope.downloadPdf = function() {
              pdfMake.createPdf(vm.docDefinition).download();
            };

            vm.tree = function (kdSurat, jenis, parentSelector) {
            var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/disposisi/lihatTree/lihatTree.html',
              controller: 'LihatTreeController',
              controllerAs: 'tree',
              // windowClass: 'app-modal-window',
              size: 'lg',
              appendTo: parentElem,
              resolve: {
                kdSurat: function () {
                  return kdSurat;
                },
                jenisTree: function () {
                  return jenis;
                }
              }
            });

            modalInstance.result.then(function (kdSurat) {
              getDokumenDisposisi(kdSurat, 0, 1);
              // vm.selected = selectedItem;
            }, function () {
              // showToastrFailed('menambahkan data');
              // $log.info('Modal dismissed at: ' + new Date());
            });
          };

          function statusBaca(status){
            switch (status) {
              case 0 : return 'Belum Dibaca'; break;
              case 1 : return 'Sudah Dibaca'; break;
              case 2 : return 'Sudah Dilanjutkan'; break;
              case 3 : return 'Proses Laporan'; break;
              case 4 : return 'Disposisi Selesai'; break;
            }
          }

          vm.cancel = function(kdSurat){
            AmbilDisposisiService.Batal(kdSurat).then(
              function(response){
                getAllDisposisi();
                getHistoryDisposisi();
                EkinerjaService.showToastrSuccess('Disposisi Berhasil Dibatalkan');
              }, function(errResponse){
                EkinerjaService.showToastrError('Disposisi Gagal Dibatalkan');
              }
            )
          }

          vm.approve = function(kdSurat, status){
            var data = {
              "kdDraftLembarDisposisi": kdSurat,
              "approved": status
            }
            AmbilDisposisiService.Approve(data).then(
              function(response){
                if(status)
                  EkinerjaService.showToastrSuccess("Berhasil Disetujui");
                else EkinerjaService.showToastrSuccess("Berhasil Ditolak");
                getDraft();
              }, function(errResponse){
                EkinerjaService.showToastrError("Gagal Disetujui");
              })
          }

      vm.formLengkapiDisposisi = function (kdLembarDisposisi, terusan, parentSelector) {
          var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/disposisi/formLengkapDisposisi/formLengkapDisposisi.html',
              controller: 'FormLengkapDisposisiController',
              controllerAs: 'formLengkap',
              // windowClass: 'app-modal-window',
              size: 'lg',
              appendTo: parentElem,
              resolve:{
                  kdLembar:function () {
                      return kdLembarDisposisi;
                  },
                  isTerusan:function () {
                    return terusan;
                  }
              }
          });

          modalInstance.result.then(function () {
              getAllDisposisi();
              // vm.selected = selectedItem;
            }, function () {
              // showToastrFailed('menambahkan data');
              // $log.info('Modal dismissed at: ' + new Date());
            });
      };
        }
})();
