(function(){
	'use strict';

	angular.module('eKinerja').controller('AmbilDisposisiController', AmbilDisposisiController);

	function AmbilDisposisiController(HakAksesService, EkinerjaService, AmbilDisposisiService, KontrakPegawaiService, $scope, $state, $uibModal, $document){
		var vm = this;
      	vm.loading = true;

      	getAllDisposisi();
        getHistoryDisposisi();

        function getAllDisposisi(){
          AmbilDisposisiService.GetAllDisposisi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              response = response.sort( function ( a, b ) { return b.tglPengirimanMilis - a.tglPengirimanMilis; } );
              for(var i = 0; i < response.length; i++){
                  var date = new Date(response[i].tglPengirimanMilis);
                  response[i].tglPengiriman += " pukul " + date.getHours() + ":" + date.getMinutes();
              }

              vm.dataHistory = response;debugger
              // vm.loading = false;
              vm.dataLookDisposisi = angular.copy(vm.dataHistory);
              pagingDisposisi();
            }, function(errResponse){

            })
        }

        function getDokumenDisposisi(kdLembarDisposisi){
          AmbilDisposisiService.GetDokumenDisposisi(kdLembarDisposisi).then(
            function(response){debugger
              template(response);
            }, function(errResponse){

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
        HakAksesService.GetAllPegawai().then(
        function(response){
          vm.list_pegawai = response;
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

        vm.openTemplate = function (uraianTugas, isDPA, parentSelector) {
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
                  table: {
                    widths: [120, 120, 120, 120],
                    body: [
                      [
                        {
                          border: [true, true, true, false],
                          text: 'PEMERINTAH KABUPATEN BEKASI',
                          style: 'header',
                          colSpan: 4
                        },{},{},{}
                      ],
                      [
                        {
                          border: [true, false, true, false],
                          text: '' + item.targetPegawaiLembarDisposisi[0].unitKerja,
                          style: 'header',
                          colSpan: 4
                        },{},{},{}
                      ],
                      [
                        {
                          colSpan:4,
                          margin: [130,-5,0,0],
                          border: [true, false, true, false],
                          table: {
                            widths: [240],
                            body:[
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
                                  style: 'header2'
                                }
                              ]
                            ]
                          }
                        }
                      ],
                      [
                        {
                          colSpan:4,
                          margin: [70,-5,0,0],
                          border: [true, false, true, true],
                          table: {
                            widths: [90, 90, 180],
                            body:[
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Telp. (021) 89970696',
                                  fontSize: 9,
                                  alignment: 'right'
                                },
                                {
                                  border: [false, false, false, false],
                                  text: 'Fax. (021) 89970064',
                                  fontSize: 9,
                                  alignment: 'center'
                                },
                                {
                                  border: [false, false, false, false],
                                  text: 'email : diskominfo@bekasikab.go.id',
                                  fontSize: 9,
                                  alignment: 'left'
                                }
                              ]
                            ]
                          }
                        }
                      ],
                      [
                        {
                          colSpan: 4,
                          text: 'LEMBAR DISPOSISI',
                          fontSize: 15,
                          alignment: 'center'
                        },{},{},{}
                      ],
                      [
                        {
                          colSpan: 2,
                          table: {
                            widths: [110, 110],
                            body: [
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Nomor Agenda/Registrasi :',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ['' + item.kdLembarDisposisi],
                                  fontSize: 9
                                }
                              ]
                            ]
                          }
                        },{},
                        {
                          colSpan: 2,
                          table: {
                            widths: [65, 110],
                            body: [
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Tkt.Keamanan :',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: [''],
                                  fontSize: 9
                                }
                              ]
                            ]
                          }
                        },{}
                      ],
                      [
                        {
                          colSpan: 2,
                          table: {
                            widths: [90, 110],
                            body: [
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Tanggal Penerimaan :',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ['' + item.tanggalPenerimaan],
                                  fontSize: 9
                                }
                              ]
                            ]
                          }
                        },{},
                        {
                          colSpan: 2,
                          table: {
                            widths: [95, 110],
                            body: [
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Tanggal Penyelesaian :',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ['' + item.tglPenyelesaian],
                                  fontSize: 9
                                }
                              ]
                            ]
                          }
                        },{}
                      ],
                      [
                        {
                          colSpan: 4,
                          table: {
                            widths: [107, 2, 370],
                            body: [
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Tanggal dan Nomor Surat',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ':',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ['' + item.tanggalSuratDisposisi + ' dan ' + item.noSuratDisposisi],
                                  fontSize: 9
                                }
                              ],
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Dari',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ':',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ['' + pegawai.nama],
                                  fontSize: 9
                                }
                              ],
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Ringkasan Isi',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ':',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ['' + item.ringkasanIsi],
                                  fontSize: 9
                                }
                              ],
                              [
                                {
                                  border: [false, false, false, false],
                                  text: 'Lampiran',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ':',
                                  fontSize: 9
                                },
                                {
                                  border: [false, false, false, false],
                                  text: ['' + item.lampiran],
                                  fontSize: 9
                                }
                              ]
                            ]
                          }
                        }
                      ],
                      [
                        {
                          fontSize: 12,
                          colSpan: 2,
                          text: 'Disposisi',
                          alignment: 'center'
                        },
                        {
                          
                        },
                        {
                          fontSize: 12,
                          text: 'Diteruskan Kepada',
                          alignment: 'center'
                        },
                        {
                          fontSize: 12,
                          text: 'Paraf',
                          alignment: 'center'
                        }
                      ],
                      [
                        {
                          fontSize:9,
                          colSpan: 2,
                          text: '' + item.isiDisposisi
                        },
                        {
                          
                        },
                        {
                          fontSize: 9,
                          ol: []
                        },
                        {
                          fontSize: 9,
                          ul: [
                            'Sudah Ditandatangan',
                            'Sudah Ditandatangan',
                            'Sudah Ditandatangan'
                          ]
                        }
                      ]
                    ]
                  }
                }
            ],
            styles: {
                header: {
                  bold: true,
                  fontSize: 15,
                  alignment: 'center'
                },
                header2: {
                  fontSize: 10,
                  alignment: 'center'
                }
              }
          }
            if (item.tktKeamanan == 1) {
              docDefinition.content[0].table.body[5][2].table.body[0][1].text[0] += "SR";
            }
            else if (item.tktKeamanan == 2) {
              docDefinition.content[0].table.body[5][2].table.body[0][1].text[0] += "R";
            }
            else if (item.tktKeamanan == 3) {
              docDefinition.content[0].table.body[5][2].table.body[0][1].text[0] += "B";
            }
            for(var i = 0; i < item.targetPegawaiLembarDisposisi.length; i++){
                  docDefinition.content[0].table.body[9][2].ol.push(item.targetPegawaiLembarDisposisi[i].nama);
              }
              pdfMake.createPdf(docDefinition).open();
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

            $scope.downloadPdf = function() {
              pdfMake.createPdf(vm.docDefinition).download();
            };

            vm.tree = function (kdSurat, parentSelector) {
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
        } 	 
})();