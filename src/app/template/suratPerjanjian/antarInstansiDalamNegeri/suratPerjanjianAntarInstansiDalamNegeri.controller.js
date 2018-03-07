(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('SuratPerjanjianAntarInstansiDalamNegeriController', SuratPerjanjianAntarInstansiDalamNegeriController);

    function SuratPerjanjianAntarInstansiDalamNegeriController(EkinerjaService, SuratPerjanjianAntarInstansiDalamNegeriService, HakAksesService, $scope, $state) {
        var vm = this;
        vm.loading = true;
        vm.item = {}

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.save = function(){
            var data = {
                "namaInstansi1": vm.item.namainstansi1,
                "namainstansi2": vm.item.namainstansi2,
                "tentang": vm.item.tentang,
                "nomorSurat1": vm.item.nomorSurat1,
                "nomorSurat2": vm.item.nomorSurat2,
                "tempat": vm.item.tempat,
                "namaPihakKeSatu": vm.item.namapihakkesatu,
                "nipPihakKeSatu": vm.item.nippihakkesatu,
                "golPihakKeSatu": vm.item.golonganpihakkesatu,
                "jabatanPihakKeSatu": vm.item.jabatanpihakkesatu,
                "namaPihakKeDua": vm.item.namapihakkedua,
                "nipPihakKeDua": vm.item.nippihakkedua,
                "golPihakKeDua": vm.item.golonganpihakkedua,
                "jabatanPihakKeDua": vm.item.jabatanpihakkedua,
                "tujuan": vm.item.tujuan,
                "ruangLingkup": vm.item.ruanglingkup,
                "pelaksanaanKegiatan": vm.item.pelaksanaankegiatan,
                "pembiayaan": vm.item.pembiayaan,
                "penyelesaianPerselisihan": vm.item.penyelesaianperselisihan,
                "lainlain": vm.item.lainlain,
                "penutup": vm.item.penutup
            }
        }

        vm.item.tahun = ((new Date()).getYear() + 1900);

        function template(){
            vm.docDefinition = {
                content: [
                    {
                        text: 'PERJANJIAN KERJASAMA ANTARA', style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: '' + vm.item.namainstansi1.toUpperCase(), style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: 'DAN', style: 'nama_judul', margin: [0,10,0,0]
                    },
                    {
                        text: '' + vm.item.namainstansi2.toUpperCase(), style: 'nama_judul', margin: [0,10,0,0]
                    },

                    {
                        text: 'TENTANG', style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: '' + vm.item.tentang.toUpperCase(), style: 'judul_nomor'
                    },

                    {
                        text: 'NOMOR : ' + '' + vm.item.nomorSurat1, style: 'nama_judul', margin: [0,15,0,0]
                    },
                    {
                        text: 'NOMOR : ' + '' + vm.item.nomorSurat2, style: 'nama_judul', margin: [0,5,0,20]
                    },

                    {
                        margin : [0,15,0,15],
                        alignment:'justify',
                        text:[
                            {text: 'Pada hari ini '},
                            {text: '' + EkinerjaService.IndonesianDay(new Date()), bold:true},
                            {text: ' tanggal '},
                            {text: '' + EkinerjaService.IndonesianDate(new Date()), bold:true},
                            {text: ' bulan '},
                            {text: '' + EkinerjaService.IndonesianMonth(new Date()), bold:true},
                            {text: ' tahun '},
                            {text: '' + EkinerjaService.IndonesianYear(new Date()) + ',', bold:true},
                            {text: ' bertempat di '},
                            {text: '' + vm.item.tempat + ',', bold:true},
                            {text: ' bertanda tangan dibawah ini:'}
                        ]
                    },

                    {
                        bold:true,
                        margin:[0,0,0,15],
                        ol: [
                            {
                                widths: ['*', '*', '*'], margin:[0,0,0,10],
                                table: {
                                    body: [
                                        [
                                            {text: 'Nama'},
                                            {text: ':'},
                                            {text: '' + vm.item.namapihakkesatu, bold: false}
                                        ],
                                        [
                                            {text: 'NIP'},
                                            {text: ':'},
                                            {text: '' + vm.item.nippihakkesatu, bold: false}
                                        ],
                                        [
                                            {text: 'Pangkat/Gol. Ruang'},
                                            {text: ':'},
                                            {text: '' + vm.item.golonganpihakkesatu, bold: false}
                                        ],
                                        [
                                            {text: 'Jabatan'},
                                            {text: ':'},
                                            {text: '' + vm.item.jabatanpihakkesatu, bold: false}
                                        ],
                                        [
                                            {
                                                margin:[0,5,0,0],
                                                colSpan:3,
                                                bold: false,
                                                text: [
                                                    {text: 'Selanjutnya disebut '},
                                                    {text: 'PIHAK KESATU.', bold:true}
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
                                            {text: '' + vm.item.namapihakkedua, bold: false}
                                        ],
                                        [
                                            {text: 'NIP'},
                                            {text: ':'},
                                            {text: '' + vm.item.nippihakkedua, bold: false}
                                        ],
                                        [
                                            {text: 'Pangkat/Gol. Ruang'},
                                            {text: ':'},
                                            {text: '' + vm.item.golonganpihakkedua, bold: false}
                                        ],
                                        [
                                            {text: 'Jabatan'},
                                            {text: ':'},
                                            {text: '' + vm.item.jabatanpihakkedua, bold: false}
                                        ],
                                        [
                                            {
                                                margin:[0,5,0,0],
                                                colSpan:3,
                                                bold: false,
                                                text: [
                                                    {text: 'Selanjutnya disebut '},
                                                    {text: 'PIHAK KEDUA.', bold:true}
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
                        margin : [0,0,0,15],
                        alignment:'justify',
                        text:[
                            {text: 'bersepakat untuk melakukan kerja sama dalam bidang '},
                            {text: '' + vm.item.tentang},
                            {text: ' yang diatur dalam ketentuan sebagai berikut:'}
                        ]
                    },

                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 1\n', style: 'nama_judul'},
                            {text: 'TUJUAN KERJASAMA\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.tujuan, alignment:'justify'}]
                    },
                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 2\n', style: 'nama_judul'},
                            {text: 'RUANG LINGKUP KERJASAMA\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.ruanglingkup, alignment:'justify'}]
                    },
                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 3\n', style: 'nama_judul'},
                            {text: 'PELAKSANAAN KEGIATAN\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.pelaksanaankegiatan, alignment:'justify'}]
                    },
                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 4\n', style: 'nama_judul'},
                            {text: 'PEMBIAYAAN\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.pembiayaan, alignment:'justify'}]
                    },
                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 5\n', style: 'nama_judul'},
                            {text: 'PENYELESAIAN PERSELISIHAN\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.penyelesaianperselisihan, alignment:'justify'}]
                    },

                    {
                        margin: [0,0,0,15],
                        text: [
                            {text: 'Pasal 6\n', style: 'nama_judul'},
                            {text: 'LAIN-LAIN\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.lainlain, alignment:'justify'}]
                    },

                    {
                        margin: [0,0,0,30],
                        text: [
                            {text: 'Pasal 7\n', style: 'nama_judul'},
                            {text: 'PENUTUP\n\n', style: 'nama_judul'},
                            {text: '' + vm.item.penutup, alignment:'justify'}]
                    },

                    {
                        style: 'tandaTangan',
                        table: {
                            widths: ['*','*','*'],
                            body: [
                                [{text: '' + vm.item.namainstansi2.toUpperCase() + ',', bold: true, alignment: 'center'},{},{text: '' + vm.item.namainstansi1.toUpperCase() + ',', bold: true, alignment: 'center'}],
                                [{text: 'PIHAK KEDUA,', bold: true, alignment: 'center'},{},{text: 'PIHAK KESATU,', bold: true, alignment: 'center'}],
                                [{text: ' ',margin: [0,15]},{},{text: ' ',margin: [0,15]}],
                                [{text: '' + vm.item.namapihakkedua.toUpperCase(), alignment: 'center'}, {}, {text: '' + vm.item.namapihakkesatu.toUpperCase(), alignment: 'center'}]
                            ]
                        },
                        layout: 'noBorders'
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
                    tandaTangan: {
                        color: '#000',
                        fontSize: 10,
                        alignment:'right'
                    }
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
            EkinerjaService.lihatPdf(vm.docDefinition, 'Surat Perjanjian');
        };

        $scope.downloadPdf = function() {
            pdfMake.createPdf(vm.docDefinition).download();
        };
    }
})();