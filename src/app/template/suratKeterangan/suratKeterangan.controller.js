(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('SuratKeteranganController', SuratKeteranganController);

    function SuratKeteranganController(EkinerjaService, SuratKeteranganService, HakAksesService, $scope, $state, logo_bekasi) {
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
        }

        $scope.$watch('pegawai', function(){
            if($scope.pegawai.length == 18)
                vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
            debugger
        })

        vm.back =  function(){
          $state.go('kontrak');
        }

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
                        text: 'SURAT KETERANGAN',
                        style: 'header'
                    },
                    {
                        margin:[0,0,0,15],
                        text: [{text : 'NOMOR : ', style: 'judul_nomor'}, '' + vm.item.nomorSurat + '/' + vm.item.nomorSurat1 + '/' + vm.item.nomorSurat2 + '/' + vm.item.nomorSurat3 + '/' + ((new Date()).getYear() + 1900)]
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
                                    {
                                        border: [false, false, false, false],
                                        text: 'Nama',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ':',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + $.parseJSON(sessionStorage.getItem('credential')).namaPegawai,
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: 'NIP',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ':',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: 'Jabatan',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ':',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan,
                                        fontSize: 10
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        margin: [0, 30, 0, 0],
                        text: 'Dengan ini menerangkan bahwa'
                    },
                    {
                        margin: [40, 10, 0 ,0],
                        table: {
                            widths: [107, 2, 330],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: 'Nama',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ':',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.item.pegawaiPenerima.nama,
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: 'NIP',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ':',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.item.pegawaiPenerima.nipPegawai,
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: 'Pangkat/Golongan',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ':',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.item.pegawaiPenerima.golongan,
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: 'Jabatan',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ':',
                                        fontSize: 10
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.item.pegawaiPenerima.jabatan,
                                        fontSize: 10
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        margin: [-5, 20, 0 ,0],
                        table: {
                            widths: [500],
                            border: [false, false, false, false],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: '' + vm.item.isiketerangan,
                                        fontSize: 10
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        margin: [330,30,0,0],
                        table: {
                            widths: [40, 120],
                            body: [
                                [
                                    {
                                        alignment: 'left',
                                        border: [false, false, false, false],
                                        text: '' + vm.item.tempat+', '
                                    },
                                    {
                                        border: [false, false, false, false],
                                        alignment: 'left',
                                        text: '' + EkinerjaService.IndonesianDateFormat(new Date())
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'Pemberi Keterangan'
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'tanda tangan\n\n'
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + $.parseJSON(sessionStorage.getItem('credential')).namaPegawai
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
                        fontSize: 10,
                        alignment: 'center'
                    },
                    judul_nomor: {
                        alignment : 'center',
                        bold: true,
                        fontSize: 11
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