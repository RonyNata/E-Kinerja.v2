(function(){
	'use strict';

	angular.module('eKinerja').controller('AmbilDisposisiController', AmbilDisposisiController);

	function AmbilDisposisiController(EkinerjaService, AmbilDisposisiService, $scope, $state){
		var vm = this;
      	vm.loading = true;

      	getAllDisposisi();

        function getAllDisposisi(){
          AmbilDisposisiService.GetAllDisposisi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              vm.dataHistory = response;debugger
            }, function(errResponse){

            })
        }

        function getDokumenDisposisi(kdLembarDisposisi){
          AmbilDisposisiService.GetDokumenDisposisi(kdLembarDisposisi).then(
            function(response){
              template(response);
            }, function(errResponse){

            })
        }

        function template(item){
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
                          text: 'DINAS KOMUNIKASI DAN INFORMATIKA PERSANDIAN DAN STATISTIK',
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
                                  text: ['', + item.tanggalSuratDisposisi + ' dan ' + item.noSuratDisposisi],
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
                                  text: ['' + item.dari],
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
                                  text: ['', + item.ringkasanIsi],
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
                          text: 'Disposisi Surat Perintah Mengembangkan Diri'
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
        } 	 
})();