(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('KAAController', KAAController);

    
    function KAAController(EkinerjaService, HakAksesService, NotaDinasService, PengumpulanDataBebanKerjaService, 
      $scope, $state, logo_bekasi, $uibModal, $document, PenilaianService) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.target = [{"id": new Date().getTime()}];

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.tembusanSurat = [{"id": new Date().getTime(), "deskripsi": ''}];

        vm.addTembusan = function(){
            var data = {"id": new Date().getTime(), "deskripsi": ''};
            vm.tembusanSurat.push(data);
        };

        vm.openDari = function (pegawai, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/template/dataPegawai/dataPegawai.html',
          controller: 'DataPegawaiController',
          controllerAs: 'datapegawai',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            pegawai: function(){
              return vm.list_pegawai;
            },
            pegawaiPilihan: function(){
              return pegawai;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            vm.item.pembuatKomitmen = data;
          }, function () {

          });
        };

        function getDocumentNodin(){
            PenilaianService.GetDataNodin($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorUrusan": response.nomorUrusan,
                        "nomorPasanganUrut": response.nomorPasanganUrut,
                        "nomorUnit": response.nomorUnit,
                        "nomorUrut": response.nomorUrut,
                        "tahun": response.nomorTahun,

                        "isiNotaDinas": response.isiNotaDinas,
                        "hal": response.hal,
                        "pegawaiPemberi": EkinerjaService.findPegawaiByNip(response.pemberiNotaDinas.nip,vm.list_pegawai),
                        "pegawaiPenerima": EkinerjaService.findJabatanByKdJabatan(response.kdJabatanPenerimaNotaDinas, vm.list_pegawai),
                        "pegawaiPenandatangan": EkinerjaService.findPegawaiByNip(response.penandatangan.nip,vm.list_pegawai),
                        "tanggal": new Date(response.tanggalPembuatanMilis)
                    };

                    vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(response.nipPenandatangan, vm.list_pegawai);
                    $scope.pegawaiP = response.nipPenandatangan;

                    vm.tembusanSurat = [];
                    for(var i = 0; i < response.tembusanNotaDinasList.length; i++)
                      vm.tembusanSurat.push({"id": new Date().getTime(), "jabat": response.tembusanNotaDinasList[i].kdJabatan,
                                                "jabatan": response.tembusanNotaDinasList[i]});
                }
                );
        }

        vm.save = function(){
            var data = {
                "kdNotaDinas": "",
                "nomorUrusan": vm.item.nomorUrusan,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,
                "nomorUnit": vm.item.nomorUnit,
                "kdJabatanPenerimaNotaDinas": vm.item.pegawaiPenerima.kdJabatan,
                "nipPemberiNotaDinas": vm.item.pegawaiPemberi.nipPegawai,
                "hal": vm.item.hal,
                "tanggalNotaDinasMilis": vm.item.tanggal.getTime(),
                "isiNotaDinas": vm.item.isiNotaDinas,
                "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "durasiPengerjaan": vm.item.durasiPengerjaan,
                "kdTembusanList": [],
                "kdNotaDinasBawahan": null,
                "kdNaskahPenugasan": "",
                "jenisNaskahPenugasan": "3",
                "statusPenilaian": "",
                "alasanPenolakan": ""
            };

            if($state.params.kdSuratBawahan != "")
                data.kdNotaDinasBawahan = $state.params.kdSuratBawahan;

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                data.kdTembusanList.push(vm.tembusanSurat[i].jabatan.kdJabatan);

            console.log(data);
            NotaDinasService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                    return $state.go('kontrak');
                }, function(errResponse){
                    EkinerjaService.showToastrError('Data Tidak Berhasil Disimpan');
                });

        };

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        };

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.params.kdSuratBawahan != undefined)
                getDocumentNodin();
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.params.kdSuratBawahan != undefined)
                      getDocumentNodin();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.findJabatan = function(idx){
            if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
                vm.tembusanSurat[idx].jabatan = EkinerjaService.findJabatanByKdJabatan(vm.tembusanSurat[idx].jabat, vm.list_jabatan);
        };

        PengumpulanDataBebanKerjaService.GetAllJabatan().then(
            function(response){
                vm.list_jabatan = response;
                vm.loading = false;
            }, function(errResponse){

            });

        $scope.$watch('pegawaipenerima', function(){
            if($scope.pegawaipenerima.length == 18)
                vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawaipenerima,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaipemberi', function(){
            if($scope.pegawaipemberi.length == 18)
                vm.item.pegawaiPemberi = EkinerjaService.findPegawaiByNip($scope.pegawaipemberi,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaipenandatangan', function(){
            if($scope.pegawaipenandatangan.length == 18)
                vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawaipenandatangan,vm.list_pegawai);
            debugger
        });

        // vm.save = function(){
        //   vm.item.tembusanSurat = [];
        //   vm.item.tanggal = vm.item.tanggal.getTime();
        //   vm.item.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
        //   vm.item.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
        //   vm.item.nmInstansi = $.parseJSON(sessionStorage.getItem('credential')).unit;
        //   for(var i = 0; i < vm.target.length; i++)
        //     vm.item.tembusanSurat.push(vm.target[i].pegawaiTarget.nipPegawai);
        //   console.log(vm.item);
        //   for(var i = 0; i < vm.notadinas.length; i++)
        //     data.targetPegawaiList.push(vm.target[i].pegawaiPembuat.nipPegawai);
        //   NotaDinasService.save(vm.item).then(
        //     function(response){
        //       EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
        //     }, function(errResponse){

        //     })
        // };

        vm.back =  function(){
          $state.go('kontrak');
        };

        function template(){
          vm.docDefinition = {
            content: [
            {
                table:{
                    widths: [100,'*'],
                    body: [
                        [
                            {
                                image: 'logo',
                                width: 90,
                                height: 90,
                                alignment: 'center'
                            },
                            [
                                {
                                    text:[
                                        {text: 'PEMERINTAHAN KABUPATEN BEKASI\n', alignment: 'center', style:'header'},
                                        {text: '' + $.parseJSON(sessionStorage.getItem('credential')).unit.toUpperCase() + '\n', alignment: 'center', style:'header'},
                                        {text: 'Komplek Perkantoran Pemerintah Kabupaten\nBekasi Desa Sukamahi Kecamatan Cikarang Pusat', style: 'header2'}
                                    ]
                                },
                                {
                                    margin: [15,0,0,0],
                                    table: {
                                        body: [
                                            [
                                                {text: 'Telp. (021) 89970696', style: 'header3'},
                                                {text: 'Fax. (021) 89970064', style: 'header3'},
                                                {text: 'email : diskominfo@bekasikab.go.id', style: 'header3'}
                                            ]
                                        ]
                                    }, layout: 'noBorders'
                                }
                            ]
                        ],
                        [{text:'', colSpan: 2}],
                        [{text:'', fillColor: 'black', colSpan: 2}]
                    ]
                },
                layout: 'noBorders'
            },

            {
                margin: [0,15,0,0],
                text: 'KERANGKA ACUAN KERJA',
                style: 'header4',
                alignment: 'center'
            },
            {
                margin: [0,15,0,0],
                table: {
                    body: [
                        [
                            {text: 'Latar Belakang', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.latarBelakang, style: 'header5'}
                        ],
                        [
                            {text: 'Maksud dan Tujuan', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {
                                stack: [
                                    '' + vm.item.maksud,
                                    {
                                        ol: [
                                            
                                        ]
                                    }
                                ]
                            }
                        ],
                        [
                            {text: 'Sasaran', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.sasaran, style: 'header5'}
                        ],
                        [
                            {text: 'Lokasi Kegiatan', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.lokasi, style: 'header5'}
                        ],
                        [
                            {text: 'Nama dan Organisasi Penjabat Pembuat Komitmen', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.pembuatKomitmen.unitKerja + '\n' +
                            vm.item.pembuatKomitmen.nama, style: 'header5'}
                        ],
                        [
                            {text: 'Satuan Kerja', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.pembuatKomitmen.unitKerja, style: 'header5'}
                        ],
                        [
                            {text: 'Referensi Hukum', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {
                                ol: [
                                ]
                            }
                        ],
                        [
                            {text: 'Lingkup Pekerjaan', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {
                                ol: [
                                ]
                            }
                        ],
                        [
                            {text: 'Peralatan', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {
                                stack: [
                                    '' +vm.item.peralatan
                                ]
                            }
                        ],
                        [
                            {text: 'Pagu Anggran', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.paguAnggaran, style: 'header5'}
                        ],
                        [
                            {text: 'Lingkup Kewenangan Penyedia Jasa', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.lingkupKewenangan, style: 'header5'}
                        ],
                        [
                            {text: 'Jangka Waktu Penyelesaian Pekerjaan', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.jangkaWaktu, style: 'header5'}
                        ],
                        [
                            {text: 'Jadwal Pelaksanaan Kegiatan', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {
                                table: {
                                    body: [
                                        [
                                            {text: 'No', style: 'header4'},
                                            {text: 'Jadwal Kegiatan', style: 'header4'},
                                            {text: 'Tanggal', style: 'header4'}
                                        ],
                                        ['1', 'Pendaftaran dan Seleksi AdministrasiI', '15 sd 23 Februari 2018'],
                                        ['2', 'Pengumuman Hasil Selesi Administrasi', '23 Februari 2018'],
                                        ['3', 'Test 1 (wraiten)', '24 Februari 2018'],
                                        ['4', 'Test 2 (praktek)', '25 Februari 2018'],
                                        ['5', 'Test 3 (interview)', '26 Februari 2018'],
                                        ['6', 'Pengumuman Kelulusan', '28 Februari 2018']
                                    ]
                                }
                            }
                        ],
                        [
                            {text: 'Hasil Laporan', style: 'header4'},
                            {text: ':', style: 'header4'},
                            {text: '' + vm.item.hasil, style: 'header5'}
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
            },
            header6: {
                fontSize: 12,
                alignment:'right'
            }
        },

              images:{
                  logo: logo_bekasi
              }
          };
        }

        $scope.openPdf = function() {
            var blb;
            // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
            //     // turn buffer into blob
            //     blb = buffer;
            // });
            // blb = new Blob(blb);
            console.log(vm.item.pembukaSurat);
            template();
            EkinerjaService.lihatPdf(vm.docDefinition, 'Kerangka Acuan Kerja');
        };

        $scope.downloadPdf = function() {
          pdfMake.createPdf(vm.docDefinition).download();
        };
   	} 
})();