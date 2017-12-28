(function(){
	'use strict';

	angular.module('eKinerja').controller('DashboardController', DashboardController);

	function DashboardController(AmbilDisposisiService, PenugasanService, KontrakPegawaiService, $state,
    TemplateSuratInstruksiService, TemplateSuratPerintahService, DashboardService, EkinerjaService, $uibModal){
		var vm = this;
    vm.loading = true;

    vm.naskah = [];

    getAllDisposisi();

    function getAllDisposisi(){
      DashboardService.GetDisposisi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        function(response){
          response = response.sort( function ( a, b ) { return b.tglPengirimanMilis - a.tglPengirimanMilis; } );
          for(var i = 0; i < response.length; i++){
            switch(response[i].tktKeamanan){
              case 1: response[i].rahasia = "Sangat Rahasia"; break;
              case 2: response[i].rahasia = "Rahasia"; break;
              case 3: response[i].rahasia = "Biasa"; break;
            }
            var date = new Date(response[i].tglPengirimanMilis);
            response[i].tglPengiriman += " pukul " + date.getHours() + ":" + date.getMinutes();
          }
          getLaporan();
          vm.naskahDisposisi = response;debugger
        }, function(errResponse){

        })
    }

    vm.getDokumenDisposisi = function(kdLembarDisposisi, idx){
      vm.naskahDisposisi[idx].loading = true;
      AmbilDisposisiService.GetDokumenDisposisi(kdLembarDisposisi).then(
        function(response){debugger
          template(response);
          vm.naskahDisposisi[idx].loading = false;
          DashboardService.ChangeRead(kdLembarDisposisi, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
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
          getNaskahPenugasanInstruksiTarget();
        },function(errResponse){

        })
    }

    function getLaporan(){
      EkinerjaService.GetNotifLaporan($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        function(response){debugger
          response = response.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
          for(var i = 0; i < response.length;i++){
            var date = new Date(response[i].tanggalDibuatMilis);
            response[i].tglMasuk = EkinerjaService.IndonesianDateFormat(date);
            response[i].tglMasuk += " pukul " + date.getHours() + ":" + date.getMinutes();
          }
          vm.laporan = response;
          getPerintahHistory();
        },function(errResponse){

        })
    }

    function getNaskahPenugasanInstruksiTarget(){
      DashboardService.GetInstruksi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        function(response){debugger
          response = response.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
          for(var i = 0; i < response.length;i++){
            var waktu = new Date(response[i].tanggalDibuatMilis);
            response[i].tanggalDibuat += " pukul " + waktu.getHours() + ":" + waktu.getMinutes();
            response[i].nama = "Instruksi";
            response[i].jenis = 0;
            response[i].judulNaskah = response[i].judulInstruksi;
            vm.naskah.push(response[i]);
          }
          getNaskahPenugasanPerintahTarget();
        }, function(errResponse){

        })
    }
    
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

    function getNaskahPenugasanPerintahTarget(){
      DashboardService.GetPerintah($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        function(response){
          for(var i = 0; i < response.length;i++){
            var waktu = new Date(response[i].createdDateMilis);
            response[i].tanggalDibuat = response[i].createdDate;
            response[i].tanggalDibuat += " pukul " + waktu.getHours() + ":" + waktu.getMinutes();
            console.log(response);
            console.log(waktu.getHours());
            response[i].nama = "Perintah";
            response[i].jenis = 1;
            response[i].judulNaskah = "Surat Perintah";
            response[i].namaPengirim = response[i].namaPemberi;
            response[i].tanggalDibuatMilis = response[i].createdDateMilis
            // response[i].tanggalDibuat = response[i].createdDate;
            vm.naskah.push(response[i]);
          }
          vm.naskah = vm.naskah.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
          vm.loading = false;
          // getNaskahPenugasanPerintah();
        }, function(errResponse){

        })
    }   

    vm.getDocument = function(naskah, idx, isHistory){
      vm.naskah[idx].loading = true;
      switch(naskah.jenis){
        case 0 : getDocumentInstruksi(naskah.kdInstruksi, idx); break;
        case 1 : getDocumentPerintah(naskah.kdSurat, idx); break;
      }

    };

    function getDocumentInstruksi(kdHistory, idx){
      KontrakPegawaiService.GetDataInstruksi(kdHistory).then(
        function(response){
          vm.data = response;
          var doc = TemplateSuratInstruksiService.template(vm.data);
          vm.naskah[idx].loading = false;
          DashboardService.ChangeReadInstruksi(kdHistory, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
          pdfMake.createPdf(doc).open();
        }, function(errResponse){

        })
    }

    function getDocumentPerintah(kdHistory, idx){
      PenugasanService.GetDataPerintah(kdHistory).then(
        function(response){
          vm.data = response;debugger
          var doc = TemplateSuratPerintahService.template(vm.data);
          vm.naskah[idx].loading = false;
          DashboardService.ChangeReadPerintah(kdHistory, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
          pdfMake.createPdf(doc).open();
        }, function(errResponse){

        })
    }

    vm.getDocumentPerintahLaporan = function(laporan, kdHistory, idx){
      laporan.loading = true;
      PenugasanService.GetDataPerintah(kdHistory).then(
        function(response){
          vm.data = response;debugger
          var doc = TemplateSuratPerintahService.template(vm.data);
          laporan.loading = false;
          DashboardService.ChangeReadPerintah(kdHistory, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
          pdfMake.createPdf(doc).open();
        }, function(errResponse){

        })
    }

    vm.tanggapi = function(){
      $state.go('penilaian');
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
	}
})();