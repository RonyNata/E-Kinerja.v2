(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('LihatSuratController', LihatSuratController);

    
    function LihatSuratController(naskah, jenis, $uibModalInstance, AmbilDisposisiService, PenugasanService, KontrakPegawaiService, $state, PenilaianService,
    TemplateSuratInstruksiService, TemplateSuratPerintahService, DashboardService, EkinerjaService, API,
    TemplateTelaahanStaffService,TemplateLaporanService, TemplateSuratDinasService, TemplateSuratPengantarService,
    TemplateSuratUndanganService, TemplateSuratEdaranService, TemplateSuratKeputusanService, 
    TemplatePengumumanService, TemplateMemorandumService, TemplateSuratKuasaService,
    TemplateSuratKeteranganService, TemplateNotaDinasService, TemplateBeritaAcaraService, TemplateSuratTugasService,
    $uibModal, $document) {
      	var vm = this;

        vm.jenis = jenis;
        vm.naskah = naskah;
        switch(jenis){
          case 1: vm.judul = 'Disposisi Masuk'; break;
          case 2: vm.judul = 'Penugasan Masuk'; break;
          case 3: vm.judul = 'Laporan Masuk'; break;
          case 4: vm.judul = 'Surat Masuk'; break;
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

        vm.getDokumenDisposisi = function(disposisi){
          disposisi.loading = true;
          AmbilDisposisiService.GetDokumenDisposisi(disposisi.kdLembarDisposisi).then(
            function(response){debugger
              template(response);
              disposisi.loading = false;
              DashboardService.ChangeRead('open-lembar-disposisi/', disposisi.kdLembarDisposisi, 
                $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
            }, function(errResponse){

            })
        }

        vm.getDocument = function(naskah, idx, isHistory){
          naskah.loading = true;
          switch(naskah.jenis){
            case 0 : getDocumentInstruksi(naskah.kdInstruksi, idx); break;
            case 1 : getDocumentPerintah(naskah.kdSurat, idx); break;
            case 12: getDocumentSuratTugas(naskah, 0); break;
          }

        };

        function getDocumentInstruksi(laporan, idx){
          KontrakPegawaiService.GetDataInstruksi(laporan.kdSurat).then(
            function(response){
              vm.data = response;
              var doc = TemplateSuratInstruksiService.template(vm.data);
              laporan.loading = false;
              DashboardService.ChangeRead('open-surat-instruksi-pegawai/', 
                laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
              EkinerjaService.lihatPdf(doc, 'Surat Instruksi');
            }, function(errResponse){

            })
        }

        function getDocumentPerintah(kdHistory, idx){
          PenugasanService.GetDataPerintah(kdHistory).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratPerintahService.template(vm.data);
              vm.naskah[idx].loading = false;
              DashboardService.ChangeRead('open-surat-perintah-pegawai/', 
                kdHistory, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
              EkinerjaService.lihatPdf(doc, 'Surat Perintah');
            }, function(errResponse){

            })
        }

        function getDocumentKeputusan(laporan, isLaporan){
            // laporan.loading = true;
          PenilaianService.GetDataKeputusan(laporan.kdSurat).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratKeputusanService.template(vm.data);
              laporan.loading = false;
              if(isLaporan)
                openSuratMasuk('open-surat-keputusan-penilai/', laporan.kdSurat, '');
              else openSuratMasuk('open-surat-keputusan/', laporan.kdSurat, '');
              EkinerjaService.lihatPdf(doc, 'Surat Keputusan');
              // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
              //   openSurat(laporan.kdSurat);
            }, function(errResponse){

            })
        };

        function getDocumentEdaran(laporan, isLaporan){
          // laporan.loading = true;
          PenilaianService.GetDataEdaran(laporan.kdSurat).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratEdaranService.template(vm.data);
              laporan.loading = false;
              if(isLaporan)
                openSuratMasuk('open-surat-edaran-penilai/', laporan.kdSurat, '');
              else openSuratMasuk('open-surat-edaran/', laporan.kdSurat, '');
              EkinerjaService.lihatPdf(doc, 'Surat Edaran');
              // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
              //   openSurat(laporan.kdSurat);
            }, function(errResponse){

            })
        };

        function getDocumentUndangan(laporan, isLaporan){
          // laporan.loading = true;
          PenilaianService.GetDataUndangan(laporan.kdSurat).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratUndanganService.template(vm.data);
              laporan.loading = false;
              if(isLaporan)
                openSuratMasuk('open-surat-undangan-penilai/', laporan.kdSurat, '');
              else openSuratMasuk('open-surat-undangan/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
              EkinerjaService.lihatPdf(doc, 'Surat Undangan');
              // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
              //   openSurat(laporan.kdSurat);
            }, function(errResponse){

            })
        };

        function getDocumentPengantar(laporan, isLaporan){
          // laporan.loading = true;
          PenilaianService.GetDataPengantar(laporan.kdSurat).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratPengantarService.template(vm.data);
              laporan.loading = false;
              if(isLaporan)
                openSuratMasuk('open-surat-pengantar-penilai/', laporan.kdSurat, '');
              else openSuratMasuk('open-surat-pengantar/', laporan.kdSurat, '');
              EkinerjaService.lihatPdf(doc, 'Surat Pengantar');
              // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
              //   openSurat(laporan.kdSurat);
            }, function(errResponse){

            })
        };

        function getDocumentSuratDinas(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataSuratDinas(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateSuratDinasService.template(vm.data);
                    laporan.loading = false;
                    if(isLaporan)
                      openSuratMasuk('open-surat-dinas-penilai/', laporan.kdSurat, '');
                    else openSuratMasuk('open-surat-dinas/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
                    EkinerjaService.lihatPdf(doc, 'Surat Dinas');
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
                    EkinerjaService.lihatPdf(doc, 'Laporan');
                    DashboardService.ChangeRead('open-laporan-penilai/', 
                      laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentTelaahanStaff(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataTelaahanStaff(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateTelaahanStaffService.template(vm.data);
                    if(isLaporan)
                      openSuratMasuk('open-telaahan-staff-by-penilai/', laporan.kdSurat, '');
                    laporan.loading = false;
                    EkinerjaService.lihatPdf(doc, 'Telaahan Staff');
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentSuratKeterangan(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataSuratKeterangan(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateSuratKeteranganService.template(vm.data);
                    laporan.loading = false;
                    if(isLaporan)
                      openSuratMasuk('open-surat-keterangan-penilai/', laporan.kdSurat, '');
                    else openSuratMasuk('open-surat-keterangan/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
                    EkinerjaService.lihatPdf(doc, 'Surat Keterangan');
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentSuratKuasa(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataSuratKuasa(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateSuratKuasaService.template(vm.data);
                    laporan.loading = false;
                    if(isLaporan)
                      openSuratMasuk('open-surat-kuasa-penilai/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
                    else openSuratMasuk('open-surat-kuasa/', laporan.kdSurat, '');
                    EkinerjaService.lihatPdf(doc, 'Surat Kuasa');
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentMemorandum(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataMemorandum(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateMemorandumService.template(vm.data);
                    laporan.loading = false;
                    if(isLaporan)
                      openSuratMasuk('open-memorandum-by-penilai/', laporan.kdSurat, '');
                    else openSuratMasuk('open-memorandum-by-target/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
                    EkinerjaService.lihatPdf(doc, 'Memorandum');
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentNodin(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataNodin(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateNotaDinasService.template(vm.data);
                    laporan.loading = false;
                    if(isLaporan)
                      openSuratMasuk('open-nota-dinas-by-penilai/', laporan.kdSurat, '');
                    else openSuratMasuk('open-nota-dinas/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
                    EkinerjaService.lihatPdf(doc, 'Nota Dinas');
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentBeritaAcara(laporan){
            // laporan.loading = true;
            PenilaianService.GetDataBeritaAcara(laporan.kdSurat).then(
                function(response){
                    vm.data = response;
                    var doc = TemplateBeritaAcaraService.template(vm.data);
                    laporan.loading = false;debugger
                    openSuratMasuk('open-berita-acara-penilai/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
                    EkinerjaService.lihatPdf(doc, 'Berita Acara');
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function getDocumentSuratTugas(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataSuratTugas(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateSuratTugasService.template(vm.data);
                    laporan.loading = false;
                    if(isLaporan)
                      openSuratMasuk('open-surat-tugas-by-penilai/', laporan.kdSurat, '');
                    else openSuratMasuk('open-surat-tugas/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
                    EkinerjaService.lihatPdf(doc, 'Surat Tugas');
                }, function(errResponse){

                })
        };

        function getDocumentPengumuman(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataPengumuman(laporan.kdSurat).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplatePengumumanService.template(vm.data);
                    laporan.loading = false;
                    if(isLaporan)
                      openSuratMasuk('open-pengumuman-penilai/', laporan.kdSurat, '');
                    else openSuratMasuk('open-pengumuman/', laporan.kdSurat, '');
                    EkinerjaService.lihatPdf(doc, 'Pengumuman');
                    // if(laporan.statusPenilaian != 2 || laporan.statusPenilaian != 3)
                    //   openSurat(laporan.kdSurat);
                }, function(errResponse){

                })
        };

        function openSuratMasuk(url, kdSurat, nip){console.log(url, 
                    kdSurat, nip);
          DashboardService.ChangeRead(url, kdSurat, nip);
        }

        vm.getDokumenLaporan = function(laporan, isLaporan, idx){
          laporan.loading = true;debugger
          switch(laporan.kdJenisSurat){
            case 0: getDocumentBeritaAcara(laporan); break;
              case 1: getDocumentLaporan(laporan); break;
              case 2: getDocumentMemorandum(laporan, isLaporan); break;
              case 3: getDocumentNodin(laporan, isLaporan); break;
              case 4: getDocumentPengumuman(laporan, isLaporan); break;
              case 5: getDocumentSuratDinas(laporan, isLaporan); break;
              case 6: getDocumentEdaran(laporan, isLaporan); break;
              case 7: getDocumentKeputusan(laporan, isLaporan); break;
              case 8: getDocumentSuratKeterangan(laporan, isLaporan); break;
              case 9: getDocumentSuratKuasa(laporan, isLaporan); break;
              case 10: getDocumentPengantar(laporan, isLaporan); break;
              case 12: getDocumentSuratTugas(laporan, isLaporan); break;
              case 13: getDocumentUndangan(laporan, isLaporan); break;
              case 14: getDocumentTelaahanStaff(laporan, isLaporan); break;
              case 15: getLaporanLain(laporan, isLaporan); break;
              case 16 : getDocumentInstruksi(laporan); break;
            default: vm.getDocumentPerintahLaporan(laporan, isLaporan); break;
          }
        }

        function getLaporanLain(laporan){
          DashboardService.GetLaporanLain(laporan.namaFileTemplateLain, laporan.extensiFile, laporan.kdSurat).then(
            function(response){
              laporan.loading = false;
              var landingUrl = API + 'get-template-lain-file-revisi/' + laporan.namaFileTemplateLain + '/' + laporan.extensiFile+ '/' + laporan.kdSurat;
              $window.location.href = landingUrl;

            }, function(errResponse){
              laporan.loading = false;
              // EkinerjaService.showToastrError("Gagal Mengambil Data");
            })
        }

        vm.getDocumentPerintahLaporan = function(laporan, isLaporan){
          PenugasanService.GetDataPerintah(laporan.kdSurat).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratPerintahService.template(vm.data);
              EkinerjaService.lihatPdf(doc, 'Surat Perintah');
              if(isLaporan)
                openSuratMasuk('open-surat-perintah-penilai/', laporan.kdSurat, '');
              else openSuratMasuk('open-surat-perintah-pegawai/', laporan.kdSurat, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai);
              laporan.loading = false;
            }, function(errResponse){

            })
        }

        function openSurat(kdSurat){
            PenilaianService.OpenSurat(kdSurat).then(
              function(response){debugger
                // getLaporanBawahan();
              }, function(errResponse){

              })
          }

        vm.tanggapi = function(id){
          switch(id){
            case 1: $state.go('ambilperpindahan');break;
            case 2: $state.go('penugasan');break;
            case 3: $state.go('penilaian');break;
          }
          vm.cancel();
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        function template(item){
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
                                        {text: '' + item.targetPegawaiLembarDisposisi[0].unitKerja,style: 'header'}
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
                                        {text: 'Tkt.Keamanan : ', fontSize: 10},
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
                                            ['Ringkasan Isi', ':', {text: '' + item.ringkasanIsi, bold: true}],
                                            ['Lampiran', ':', {text: '' + item.lampiran, bold: true}]
                                        ]
                                    },colSpan: 3, layout: 'noBorders'
                                },{},{}
                            ],
                            [
                                {
                                    text: 'DISPOSISI',
                                    style: 'header4',
                                    alignment: 'center'
                                },
                                {
                                    text: 'DITERUSKAN KEPADA',
                                    style: 'header4',
                                    alignment: 'center'
                                },
                                {
                                    text: 'PARAF',
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
          }
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
                docDefinition.content[0].table.body[8][1].ol.push(item.targetPegawaiLembarDisposisi[i].nama);
                docDefinition.content[0].table.body[8][2].ul.push("Sudah Ditandatangan");
            }
              EkinerjaService.lihatPdf(docDefinition, 'Disposisi');
          };
   	} 
})();