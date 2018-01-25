(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('BeritaAcaraController', BeritaAcaraController);

    function BeritaAcaraController(EkinerjaService, BeritaAcaraService, HakAksesService, $scope, $state, logo_bekasi, $uibModal, $document) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.isiBeritaAcara = [{"id": new Date().getTime(), "deskripsiisiberitaacara": ''}];

        vm.addIsiBeritaAcara = function(){
            var data = {"id": new Date().getTime(), "deskripsiisiberitaacara": ''};
            vm.isiBeritaAcara.push(data);
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
            switch(pegawai){
                case 1: vm.item.pegawaiKesatu = data; break;
                case 2: vm.item.pegawaiKedua = data; break;
                case 3: vm.item.pegawaiMengetahui = data; break;
            }
          }, function () {

          });
        };

        vm.save = function(){
            var data = {
                "kdBeritaAcara": "",
                "nomorUrusan": vm.item.nomorUrusan,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,
                "nomorUnit": vm.item.nomorUnit,
                "nipPihakKesatu": vm.item.pegawaiKesatu.nipPegawai,
                "peranPihakKesatu": vm.item.peranPihakKesatu,
                "nipPihakKedua": vm.item.pegawaiKedua.nipPegawai,
                "peranPihakKedua": vm.item.peranPihakKedua,
                "isiBeritaAcara" : [],
                "dasarBeritaAcara" : vm.item.dasarberitaacara,
                "nipMengetahui": vm.item.pegawaiMengetahui.nipPegawai,
                "kotaPembuatanSurat": vm.item.tempat,
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "tanggalBeritaAcaraMilis": vm.item.tanggal1.getTime(),
                "durasiPengerjaan": vm.item.durasiPengerjaan
            };

            for(var i = 0; i < vm.isiBeritaAcara.length; i++)
                data.isiBeritaAcara.push(vm.isiBeritaAcara[i].deskripsiisiberitaacara);

            console.log(data);
            BeritaAcaraService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                }, function(errResponse){

                });
            $state.go('kontrak');

        };

        vm.back =  function(){
            $state.go('kontrak');
        };

        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        $scope.$watch('pegawaikesatu', function(){
            if($scope.pegawaikesatu.length == 18)
                vm.item.pegawaiKesatu = EkinerjaService.findPegawaiByNip($scope.pegawaikesatu,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaikedua', function(){
            if($scope.pegawaikedua.length == 18)
                vm.item.pegawaiKedua = EkinerjaService.findPegawaiByNip($scope.pegawaikedua,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaimengetahui', function(){
            if($scope.pegawaimengetahui.length == 18)
                vm.item.pegawaiMengetahui = EkinerjaService.findPegawaiByNip($scope.pegawaimengetahui,vm.list_pegawai);
            debugger
        });

        function template(){
            vm.docDefinition = {
                content: [
                    {
                        margin:[0,0,0,15],
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
                                                        {text: 'Telp. (021) 89970696', style: 'header2'},
                                                        {text: 'Fax. (021) 89970064', style: 'header2'},
                                                        {text: 'email : diskominfo@bekasikab.go.id', style: 'header2'}
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
                        text: 'BERITA ACARA', style: 'nama_judul'
                    },

                    {
                        margin:[0,0,0,15],
                        text: [{text : 'NOMOR : ', style: 'judul_nomor'}, '' + vm.item.nomorUrusan + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit +  '/' + ((new Date()).getYear() + 1900)]
                    },

                    {
                        margin : [0,15,0,15],
                        alignment:'justify',
                        text:[
                            {text: 'Pada hari ini,'},
                            {text: '' + EkinerjaService.IndonesianDay(vm.item.tanggal1), bold:true},
                            {text: ' tanggal '},
                            {text: '' + EkinerjaService.IndonesianDate(vm.item.tanggal1), bold:true},
                            {text: ' bulan'},
                            {text: '' + EkinerjaService.IndonesianMonth(vm.item.tanggal1), bold:true},
                            {text: ' tahun'},
                            {text: '' + EkinerjaService.IndonesianYear(vm.item.tanggal1) + ',', bold:true},
                            {text: ' kami yang bertanda tangan dibawah ini:'}
                        ]
                    },

                    {
                        bold:true,
                        margin:[0,0,0,15],
                        ol: [
                            {
                                widths: ['*', '*', '*'], margin:[0,0,0,5],
                                table: {
                                    body: [
                                        [
                                            {text: 'Nama'},
                                            {text: ':'},
                                            {text: ''+ vm.item.pegawaiKesatu.nama, bold: false}
                                        ],
                                        [
                                            {text: 'NIP'},
                                            {text: ':'},
                                            {text: ''+ vm.item.pegawaiKesatu.nipPegawai, bold: false}
                                        ],
                                        [
                                            {text: 'Pangkat/Gol. Ruang'},
                                            {text: ':'},
                                            {text: ''+ vm.item.pegawaiKesatu.golongan, bold: false}
                                        ],
                                        [
                                            {text: 'Jabatan'},
                                            {text: ':'},
                                            {text: ''+ vm.item.pegawaiKesatu.jabatan, bold: false}
                                        ],
                                        [
                                            {
                                                margin:[0,5,0,10],
                                                colSpan:3,
                                                bold: false,
                                                text: [
                                                    {text: 'Selanjutnya disebut '},
                                                    {text: 'PIHAK KESATU', bold:true},
                                                    {text: ' ( ' + '' + vm.item.peranPihakKesatu + ' ).'}
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                layout: 'noBorders'
                            },
                            {
                                widths: ['*', '*', '*'], margin:[0,0,0,5],
                                table: {
                                    body: [
                                        [
                                            {text: 'Nama'},
                                            {text: ':'},
                                            {text: ''+ vm.item.pegawaiKedua.nama, bold: false}
                                        ],
                                        [
                                            {text: 'NIP'},
                                            {text: ':'},
                                            {text: ''+ vm.item.pegawaiKedua.nipPegawai, bold: false}
                                        ],
                                        [
                                            {text: 'Pangkat/Gol. Ruang'},
                                            {text: ':'},
                                            {text: ''+ vm.item.pegawaiKedua.golongan, bold: false}
                                        ],
                                        [
                                            {text: 'Jabatan'},
                                            {text: ':'},
                                            {text: ''+ vm.item.pegawaiKedua.jabatan, bold: false}
                                        ],
                                        [
                                            {
                                                margin:[0,5,0,0],
                                                colSpan:3,
                                                bold: false,
                                                text: [
                                                    {text: 'Selanjutnya disebut '},
                                                    {text: 'PIHAK KEDUA', bold:true},
                                                    {text: ' ( ' + '' + vm.item.peranPihakKedua + ' ).'}
                                                ]
                                            }
                                        ]
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]
                    },

                    {
                        text:'Kedua belah pihak sepakat, bahwa:'
                    },

                    {
                        margin:[0,0,0,15],
                        alignment:'justify',
                        ol: []
                    },

                    {
                        margin:[0,0,0,15],
                        alignment:'justify',
                        text:[
                            {text:'' + vm.item.dasarberitaacara}
                        ]
                    },

                    {
                        style: 'tandaTangan',
                        table: {
                            widths: ['*','*','*'],
                            body: [
                                [{},{},{
                                    alignment:'center',
                                    text:[
                                        {text:'Dibuat di '},
                                        {text:'' + vm.item.tempat.toUpperCase()}
                                    ]
                                }],
                                [{text: 'PIHAK KEDUA,', bold: true, alignment: 'center'},{},{text: 'PIHAK KESATU,', bold: true, alignment: 'center'}],
                                [{text: ' ',margin: [0,15]},{},{text: ' ',margin: [0,15]}],
                                [{text: ''+ vm.item.pegawaiKedua.nama, alignment: 'center'}, {}, {text: ''+ vm.item.pegawaiKesatu.nama, alignment: 'center'}],
                                [{text: ''+ vm.item.pegawaiKedua.nipPegawai, alignment: 'center'}, {}, {text: ''+ vm.item.pegawaiKesatu.nipPegawai, alignment: 'center'}],
                                [{text: 'Mengetahui/Mengesahkan', alignment: 'center', colSpan: 3, margin:[0,5,0,5]}],
                                [{
                                    alignment: 'center', colSpan: 3, margin:[0,5,0,5],
                                    text:[
                                        {text: '' + vm.item.pegawaiMengetahui.jabatan.toUpperCase() + ',', bold:true}, {text: '\n\n\n\n\n\n\n'}, {text: '' + vm.item.pegawaiMengetahui.nama}, {text: '\n'},{text: '' + vm.item.pegawaiMengetahui.nipPegawai}
                                    ]
                                }]
                            ]
                        },
                        layout: 'noBorders'
                    }
                ],
                styles: {
                    header: {
                        bold: true,
                        fontSize: 14,
                        alignment: 'center'
                    },
                    header2: {
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
                        fontSize: 11
                    },
                    header3: {
                        bold: true,
                        color: '#000',
                        fontSize: 10
                    },
                    demoTable: {
                        color: '#000',
                        fontSize: 10
                    },
                    tandaTangan: {
                        color: '#000',
                        fontSize: 12,
                        alignment:'right'
                    }
                },

                images:{
                    logo: logo_bekasi
                }
            };

            for(var i = 0; i < vm.isiBeritaAcara.length; i++)
                vm.docDefinition.content[6].ol.push(vm.isiBeritaAcara[i].deskripsiisiberitaacara);
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
            pdfMake.createPdf(vm.docDefinition).open();
        };

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };
    }
})();