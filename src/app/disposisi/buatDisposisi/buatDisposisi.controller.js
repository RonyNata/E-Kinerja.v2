(function(){
	'use strict';

	angular.module('eKinerja').controller('AmbilDisposisiController', AmbilDisposisiController);

	function AmbilDisposisiController(HakAksesService, EkinerjaService, AmbilDisposisiService,
    KontrakPegawaiService, $scope, $state, $uibModal, $document, $window, DashboardService, PengumpulanDataBebanKerjaService){
		var vm = this;
      	vm.loading = true;

      	// getAllDisposisi();
        getHistoryDisposisi();

        function getAllDisposisi(){
          AmbilDisposisiService.GetAllDisposisi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              response = response.sort( function ( a, b ) { return b.tglPengirimanMilis - a.tglPengirimanMilis; } );
              for(var i = 0; i < response.length; i++){
                  var date = new Date(response[i].tglPengirimanMilis);
                  response[i].tglPengiriman += " pukul " + date.getHours() + ":" + date.getMinutes();
									response[i].ketBaca = statusBaca(response[i].statusBaca);
              }

              vm.dataHistory = response;debugger
              vm.loading = false;
              vm.dataLookDisposisi = angular.copy(vm.dataHistory);
              pagingDisposisi();
            }, function(errResponse){

            })
        }

        function getDokumenDisposisi(kdLembarDisposisi){
          AmbilDisposisiService.GetDokumenDisposisi(kdLembarDisposisi).then(
            function(response){
              template(response);
              DashboardService.ChangeRead('open-lembar-disposisi/', kdLembarDisposisi,
                $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
              getAllDisposisi();
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
              }
              vm.history = response;
              vm.dataLook = angular.copy(vm.history);
              pagingHistori();
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

        function pagingDisposisi(){
            $scope.filteredDataDisposisi = [];
            $scope.currentPageDisposisi = 0;
            $scope.numPerPageDisposisi = 10;
            $scope.maxSizeDisposisi = Math.ceil(vm.dataLookDisposisi.length/$scope.numPerPageDisposisi);
            function pageDisposisi(){
              $scope.pageDisposisi = [];
              for(var i = 0; i < vm.dataLookDisposisi.length/$scope.numPerPageDisposisi; i++){
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

              $scope.filteredDataDisposisi = vm.dataLookDisposisi.slice(begin, end);
            });
          }

          function pagingHistori(){
            $scope.filteredData = [];
            $scope.currentPage = 0;
            $scope.numPerPage = 10;
            $scope.maxSize = Math.ceil(vm.dataLook.length/$scope.numPerPage);
            function page(){
              $scope.page = [];
              for(var i = 0; i < vm.dataLook.length/$scope.numPerPage; i++){
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

              $scope.filteredData = vm.dataLook.slice(begin, end);
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

        function template(item){
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
                                        {text: '' + item.targetPegawaiLembarDisposisi[0].unitKerja.toUpperCase(),style: 'header'}
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
                                    alignment: 'center'
                                },
                                {
                                    text: '',
                                    style: 'header4',
                                    alignment: 'center'
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
                                    ol: []
                                },
                                {
                                    style: 'header5',
                                    ul: []
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

            for(var i = 0; i < item.targetPegawaiLembarDisposisi.length; i++){
                  docDefinition.content[0].table.body[8][1].ol.push(item.targetPegawaiLembarDisposisi[i].jabatan);
                  // docDefinition.content[0].table.body[8][2].ul.push("Sudah Ditandatangan");
            }
            vm.openDps(docDefinition, item.kdLembarDisposisi);
          };



            $scope.openPdf = function(kdLembarDisposisi) {
              var blb;
              getDokumenDisposisi(kdLembarDisposisi);
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
                getDokumenDisposisi(kdSurat);
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
              getDokumenDisposisi(kdSurat);
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
        }
})();
