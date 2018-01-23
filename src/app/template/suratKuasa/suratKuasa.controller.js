(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('SuratKuasaController', SuratKuasaController);

    function SuratKuasaController(EkinerjaService, SuratKuasaService, HakAksesService, $scope, $state, logo_bekasi) {
        var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.item.tahun = ((new Date()).getYear() + 1900);

        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    vm.loading = false;
                }, function(errResponse){

                })
        };

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

        vm.save = function(){
            var data = {
                "kdSuratKuasa": "",
                "nomorUrusan": vm.item.nomorUrusan,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,
                "nomorUnit": vm.item.nomorUnit,
                "nipPemberiKuasa": vm.item.pegawaiPemberi.nipPegawai,
                "nipPenerimaKuasa": vm.item.pegawaiPenerima.nipPegawai,
                "isiKuasa" : vm.item.isikuasa,
                "kotaPembuatanSurat": vm.item.tempat,
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "durasiPengerjaan": vm.item.durasiPengerjaan,
                "tanggalSuratKuasaMilis": vm.item.tanggal1.getTime() //pengambilan tanggal
            };

            console.log(data);
            SuratKuasaService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                }, function(errResponse){

                });
            $state.go('kontrak');

        };

        vm.back =  function(){
          $state.go('kontrak');
        };

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
                        text: 'SURAT KUASA',
                        style: 'header'
                    },
                    {
                        margin:[0,0,0,15],
                        text: [{text : 'NOMOR : ', style: 'judul_nomor'}, '' + vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut+ '/' + vm.item.nomorUnit + '/' + ((new Date()).getYear() + 1900)]
                    },
                    {
                        margin: [0, 30, 0, 0],
                        text: 'Yang bertanda tangan di bawah ini,'
                    },
                    {
                        margin: [40, 10, 0 ,0],
                        table: {
                            widths: [107, 2, 330],
                            body: [
                                [
                                    {text: 'Nama', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: '' + vm.item.pegawaiPemberi.nama, fontSize: 10}
                                ],
                                [
                                    {text: 'NIP', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: '' + vm.item.pegawaiPemberi.nipPegawai, fontSize: 10}
                                ],
                                [
                                    {text: 'Jabatan', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: '' + vm.item.pegawaiPemberi.jabatan, fontSize: 10}
                                ],
                                [
                                    {text: 'Alamat', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: 'Kota Deltamas', fontSize: 10}
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [0, 30, 0, 0],
                        text: 'Memberi kuasa kepada'
                    },
                    {
                        margin: [40, 10, 0 ,0],
                        table: {
                            widths: [107, 2, 330],
                            body: [
                                [
                                    {text: 'Nama', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: ''+ vm.item.pegawaiPenerima.nama, fontSize: 10}
                                ],
                                [
                                    {text: 'NIP', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: ''+ vm.item.pegawaiPenerima.nipPegawai, fontSize: 10}
                                ],
                                [
                                    {text: 'Jabatan', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: ''+ vm.item.pegawaiPenerima.jabatan, fontSize: 10}
                                ],
                                [
                                    {text: 'Alamat', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: 'Indonesia', fontSize: 10}
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [-5, 20, 0 ,0],
                        table: {
                            widths: [500],
                            body: [
                                [
                                    {text: '' + vm.item.isikuasa, fontSize: 10}
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        style: 'tandaTangan',
                        table: {
                            widths: ['*','*','*'],
                            body: [
                                [{},{},{
                                    alignment:'center',
                                    text:[
                                        {text:'' + vm.item.tempat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal1)}
                                    ]
                                }],
                                [{text: 'Penerima Kuasa,', bold: true, alignment: 'center'},{},{text: 'Pemberi Kuasa,', bold: true, alignment: 'center'}],
                                [{text: ' ',margin: [0,15]},{},{text: ' ',margin: [0,15]}],
                                [{text: ''+ vm.item.pegawaiPenerima.nama, alignment: 'center'}, {}, {text: ''+ vm.item.pegawaiPemberi.nama, alignment: 'center'}],
                                [{text: ''+ vm.item.pegawaiPenerima.nipPegawai, alignment: 'center'}, {}, {text: ''+ vm.item.pegawaiPemberi.nipPegawai, alignment: 'center'}]
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
                    judul_nomor: {
                        alignment : 'center',
                        bold: true,
                        fontSize: 11
                    },
                    tandaTangan: {
                        color: '#000',
                        fontSize: 10,
                        margin:[0,40,0,0],
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
            pdfMake.createPdf(vm.docDefinition).open();
        };

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };
    }
})();