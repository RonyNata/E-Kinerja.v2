(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('SuratUndanganController', SuratUndanganController);

    function SuratUndanganController(EkinerjaService, SuratUndanganService, PengumpulanDataBebanKerjaService,  
        HakAksesService, $scope, $state, logo_bekasi, logo_garuda, $uibModal, $document, PenilaianService) {
        var vm = this;
        vm.loading = true;
        vm.item = {};
        if($state.current.name == 'suratundangannonpejabat')
            vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.tembusanSurat = [];

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
            if(pegawai == 1)
                vm.item.pegawaiPenerima = data;
            else vm.item.pegawaiPenandatangan = data;
          }, function () {

          });
        };

        vm.openTembusan = function (jabatan, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/template/dataJabatan/dataJabatan.html',
          controller: 'DataJabatanController',
          controllerAs: 'datajabatan',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            jabatan: function(){
              return vm.list_jabatan;
            },
            jabatanPilihan: function(){
              return vm.tembusanSurat;
            },
            isPilihan: function(){
              return 0;
            }
          }
          });

          modalInstance.result.then(function () {
          }, function () {

          });
        };

        vm.openPilihanTembusan = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/template/dataJabatan/dataJabatan.html',
                controller: 'DataPegawaiController',
                controllerAs: 'datajabatan',
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    pegawai: function(){
                        return vm.tembusanSurat;
                    },
                    pegawaiPilihan: function(){
                        return vm.tembusanSurat;
                    },
                    isPilihan: function(){
                        return 1;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };

        function getDocumentUndangan(){
            PenilaianService.GetDataUndangan($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorUrusan": response.nomorUrusan,
                        "nomorPasanganUrut": response.nomorPasanganUrut,
                        "nomorUnit": response.nomorUnit,
                        "nomorUrut": response.nomorUrut,
                        "tahun": response.nomorTahun,

                        "hal": response.hal,
                        "sifat": response.sifat,
                        "lampiran": response.lampiran,
                        "tempat": response.kotaPembuatanSurat,
                        "pegawaiPenerima": EkinerjaService.findPegawaiByNip(response.nipPenerimaSuratUndangan,vm.list_pegawai),
                        "pegawaiPenandatangan": EkinerjaService.findPegawaiByNip(response.nipPenandatangan,vm.list_pegawai),
                        "tanggal1": new Date(response.tanggalPembuatanSurat),

                        "isisuratundangan": response.bagianPembukaSuratUndangan,
                        "tanggalpelaksanaan": new Date(response.bagianIsiTanggalSuratUndangan),
                        "waktupelaksanaan": response.bagianIsiWaktuSuratUndangan,
                        "tempatpelaksanaan": response.bagianIsiTempatSuratUndangan,
                        "acara": response.bagianIsiAcaraSuratUndangan,
                        "penutupsuratundangan": response.bagianPenutupSuratUndangan
                    };

                    vm.tembusanSurat = [];
                    for(var i = 0; i < response.tembusanSuratUndanganList.length; i++){
                        vm.tembusanSurat.push({
                          "id": new Date().getTime(), 
                          "jabat": response.tembusanSuratUndanganList[i].kdJabatan,
                          "jabatan": response.tembusanSuratUndanganList[i]
                        });
                    }
                }
                );
        }

        vm.save = function(){
            var data = {
                "kdSuratUndangan": null,
                "nomorUrusan": vm.item.nomorUrusan,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,
                "nomorUnit": vm.item.nomorUnit,
                "kdJabatanPenerimaSuratUndangan": vm.item.pegawaiPenerima.kdJabatan,
                "tanggalSuratUndanganMilis": vm.item.tanggal1.getTime(),
                "kotaPembuatanSurat": vm.item.tempat,
                "sifat": vm.item.sifat,
                "lampiran": vm.item.lampiran,
                "hal": vm.item.hal,
                "nipPenerimaSuratUndangan": vm.item.pegawaiPenerima.nipPegawai,
                "bagianPembukaSuratUndangan": vm.item.isisuratundangan,
                "bagianIsiHariSuratUndangan": EkinerjaService.IndonesianDay(vm.item.tanggalpelaksanaan),
                "bagianIsiTanggalSuratUndangan": vm.item.tanggalpelaksanaan.getTime(),
                "bagianIsiWaktuSuratUndangan": vm.item.waktupelaksanaan,
                "bagianIsiTempatSuratUndangan": vm.item.tempatpelaksanaan,
                "bagianIsiAcaraSuratUndangan": vm.item.acara,
                "bagianPenutupSuratUndangan": vm.item.penutupsuratundangan,
                "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "durasiPengerjaan": vm.item.durasiPengerjaan,
                "kdTembusanList": [],
                "suratPejabat": true,
                "kdNaskahPenugasan": $state.params.kdSurat,
                "jenisNaskahPenugasan": $state.params.jenisNaskah,
                "kdUrtug": $state.params.kdUrtug,
                "tahunUrtug": $state.params.tahun
            };

            if($state.params.kdSuratBawahan != "")
                data.kdSuratUndanganBawahan = $state.params.kdSuratBawahan;

            if($state.current.name == "suratundangannonpejabat")
                data.suratPejabat = false;

            if($state.params.kdSurat == "")
                data.kdNaskahPenugasan = null;

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                data.kdTembusanList.push(vm.tembusanSurat[i].jabatan.kdJabatan);

            console.log(data);
            SuratUndanganService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                    $state.go('kontrak');
                }, function(errResponse){

                });

        };

        vm.back =  function(){
            $state.go('kontrak');
        };

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.params.kdSuratBawahan != "")
                getDocumentUndangan();
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.params.kdSuratBawahan != "")
                        getDocumentUndangan();
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

        $scope.$watch('pegawai', function(){
            if($scope.pegawai.length == 18)
                vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaipenandatangan', function(){
            if($scope.pegawaipenandatangan.length == 18)
                vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawaipenandatangan,vm.list_pegawai);
            debugger
        });

        vm.back =  function(){
          $state.go('kontrak');
        }

        function template(){
            vm.docDefinition = {
                content: [
                    {
                        image: 'pejabat',
                        width: 50,
                        height: 50,
                        alignment: 'center',
                        margin: [0,0,0,5]
                    },

                    {
                        margin:[80,0,80,0],
                        text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase(), style: 'header'
                    },

                    {
                        text: 'REPUBLIK INDONESIA', style: 'header', margin: [0,0,0,15]
                    },
                    {
                        table: {
                            widths: [60, 3, 200, '*'],
                            body: [
                                [
                                    {text: 'Nomor', fontSize: 12},
                                    {text: ':', fontSize: 12},
                                    {text: '' + vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit + '/' + ((new Date()).getYear() + 1900), fontSize: 12},
                                    {text: '' + vm.item.tempat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(new Date(vm.item.tanggal1)), alignment: 'right',fontSize: 12}
                                ],
                                [
                                    {text: 'Sifat', fontSize: 12},
                                    {text: ':', fontSize: 12},
                                    {text: '' + vm.item.sifat, fontSize: 12},
                                    {text: ''}
                                ],
                                [
                                    {text: 'Hal', fontSize: 12},
                                    {text: ':', fontSize: 12},
                                    {text: '' + vm.item.hal, fontSize: 12},
                                    {text: ''}
                                ],
                                [
                                    {text: 'Lampiran', fontSize: 12},
                                    {text: ':', fontSize: 12},
                                    {text: '' + vm.item.lampiran + ' Halaman', fontSize: 12},
                                    {text: ''}
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [0, 30, 0, 0],
                        table: {
                            widths: [150],
                            body: [
                                {text: 'Yth. '+''+ vm.item.pegawaiPenerima.nama,rowSpan: 3, fontSize: 12}
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [0, 20, 0, 0],
                        table: {
                            width: [400],
                            body: [
                                [{text: ''+ vm.item.isisuratundangan, fontSize: 12}],
                                [
                                    {
                                        margin: [50, 0, 0 ,0],
                                        table: {
                                            widths: [107, 2, 300],
                                            body: [
                                                [
                                                    {text: 'tanggal', fontSize: 12},
                                                    {text: ':', fontSize: 12},
                                                    {text: ''+ EkinerjaService.IndonesianDay(vm.item.tanggalpelaksanaan) + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggalpelaksanaan), fontSize: 12}
                                                ],
                                                [
                                                    {text: 'waktu', fontSize: 12},
                                                    {text: ':', fontSize: 12},
                                                    {text: ''+ vm.item.waktupelaksanaan, fontSize: 12}
                                                ],
                                                [
                                                    {text: 'tempat', fontSize: 12},
                                                    {text: ':', fontSize: 12},
                                                    {text: ''+ vm.item.tempatpelaksanaan, fontSize: 12}
                                                ],
                                                [
                                                    {text: 'acara', fontSize: 12},
                                                    {text: ':', fontSize: 12},
                                                    {text: ''+ vm.item.acara, fontSize: 12}
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders'
                                    }
                                ],
                                [{text: ''+ vm.item.penutupsuratundangan, fontSize: 12}]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        margin: [0, 20, 0, 0],
                        columns: [
                            {
                                width: '63%',
                                text: ''
                            },
                            {
                                style: 'tandaTangan',
                                table: {
                                    widths: [200],
                                    body: [
                                        [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                        [{text: ' ',margin: [0,20]}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang, alignment : 'left', bold:true}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.pangkat, alignment : 'left', bold:true}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]
                    },

                    {fontSize: 12, text: 'Tembusan :'}
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
                    }
                },

                images:{
                    pejabat: logo_garuda
                }
            };

            var tembusan = {
                ol:[]
            };

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                tembusan.ol.push(vm.tembusanSurat[i].jabatan.jabatan);
            vm.docDefinition.content.push(tembusan);

            if($state.current.name == "suratundangannonpejabat"){
                vm.docDefinition.content[0] =
                    {
                        margin:[0,0,0,15],
                        table:{
                            widths: [100,'*'],
                            body: [
                                [
                                    {
                                        image: logo_bekasi,
                                        width: 90,
                                        height: 90,
                                        alignment: 'center'
                                    },
                                    [
                                        {
                                            text:[
                                                {text: 'PEMERINTAHAN KABUPATEN BEKASI\n', alignment: 'center', style:'header'},
                                                {text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                    };

                vm.docDefinition.content[1] = {};
                vm.docDefinition.content[2] = {};
            }
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
            EkinerjaService.lihatPdf(vm.docDefinition, 'Surat Undangan');
        };

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };
    }
})();