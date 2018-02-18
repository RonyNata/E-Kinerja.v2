 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateBeritaAcaraService',
    ['BeritaAcaraService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
    function (BeritaAcaraService, EkinerjaService,logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
            var docDefinition = {
                pageSize: 'A4',
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
                                                {text: '' + data.unitKerjaPihakKesatu + '\n', alignment: 'center', style:'header'},
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
                        text: [{text : 'NOMOR : ', style: 'judul_nomor'}, '' + data.nomorUrusan + '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit +  '/' + data.nomorTahun ]
                    },

                    {
                        margin : [0,15,0,15],
                        alignment:'justify',
                        text:[
                            {text: 'Pada hari ini,'},
                            {text: '' + EkinerjaService.IndonesianDay(new Date(data.tanggalPembuatanMilis)), bold:true},
                            {text: ' tanggal '},
                            {text: '' + EkinerjaService.IndonesianDate(new Date(data.tanggalPembuatanMilis)), bold:true},
                            {text: ' bulan'},
                            {text: '' + EkinerjaService.IndonesianMonth(new Date(data.tanggalPembuatanMilis)), bold:true},
                            {text: ' tahun'},
                            {text: '' + EkinerjaService.IndonesianYear(new Date(data.tanggalPembuatanMilis)) + ',', bold:true},
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
                                            {text: ''+ data.gelarDepanPihakKesatu + data.namaPihakKesatu + data.gelarBelakangPihakKesatu, bold: false}
                                        ],
                                        [
                                            {text: 'NIP'},
                                            {text: ':'},
                                            {text: ''+ data.nipPihakKesatu, bold: false}
                                        ],
                                        [
                                            {text: 'Pangkat/Gol. Ruang'},
                                            {text: ':'},
                                            {text: ''+ data.pangkatPihakKesatu, bold: false}
                                        ],
                                        [
                                            {text: 'Jabatan'},
                                            {text: ':'},
                                            {text: ''+ data.jabatanPihakKesatu, bold: false}
                                        ],
                                        [
                                            {
                                                margin:[0,5,0,10],
                                                colSpan:3,
                                                bold: false,
                                                text: [
                                                    {text: 'Selanjutnya disebut '},
                                                    {text: 'PIHAK KESATU', bold:true},
                                                    {text: ' ( ' + '' + data.peranPihakKesatu + ' ).'}
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
                                            {text: ''+ data.gelarDepanPihakKedua + data.namaPihakKedua + data.gelarBelakangPihakKedua, bold: false}
                                        ],
                                        [
                                            {text: 'NIP'},
                                            {text: ':'},
                                            {text: ''+ data.nipPihakKedua, bold: false}
                                        ],
                                        [
                                            {text: 'Pangkat/Gol. Ruang'},
                                            {text: ':'},
                                            {text: ''+ data.pangkatPihakKedua, bold: false}
                                        ],
                                        [
                                            {text: 'Jabatan'},
                                            {text: ':'},
                                            {text: ''+ data.jabatanPihakKedua, bold: false}
                                        ],
                                        [
                                            {
                                                margin:[0,5,0,0],
                                                colSpan:3,
                                                bold: false,
                                                text: [
                                                    {text: 'Selanjutnya disebut '},
                                                    {text: 'PIHAK KEDUA', bold:true},
                                                    {text: ' ( ' + '' + data.peranPihakKedua + ' ).'}
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
                            {text:'' + data.dasarBeritaAcara}
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
                                        {text:'' + data.kotaPembuatanSurat.toUpperCase()}
                                    ]
                                }],
                                [{text: 'PIHAK KEDUA,', bold: true, alignment: 'center'},{},{text: 'PIHAK KESATU,', bold: true, alignment: 'center'}],
                                [{text: ' ',margin: [0,15]},{},{text: ' ',margin: [0,15]}],
                                [{text: ''+ data.gelarDepanPihakKedua + data.namaPihakKedua + data.gelarBelakangPihakKedua, alignment: 'center'}, {}, {text: ''+ data.gelarDepanPihakKesatu + data.namaPihakKesatu + data.gelarBelakangPihakKesatu, alignment: 'center'}],
                                [{text: ''+ data.pangkatPihakKedua, alignment: 'center'}, {}, {text: ''+ data.pangkatPihakKesatu, alignment: 'center'}],
                                [{text: ''+ data.nipPihakKedua, alignment: 'center'}, {}, {text: ''+ data.nipPihakKesatu, alignment: 'center'}],
                                [{text: 'Mengetahui/Mengesahkan', alignment: 'center', colSpan: 3, margin:[0,5,0,5]}],
                                [{
                                    alignment: 'center', colSpan: 3, margin:[0,5,0,5],
                                    text:[
                                        {text: '' + data.jabatanMengetahui.toUpperCase() + ',', bold:true}, {text: '\n\n\n\n\n\n\n'}, {text: '' + data.namaMengetahui}, {text: '\n'}, {text: '' + data.pangkatMengetahui}, {text: '\n'}, {text: '' + data.nipMengetahui}
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

            for(var i = 0; i < data.isiBeritaAcara.length; i++)
                docDefinition.content[6].ol.push(data.isiBeritaAcara[i]);
            return docDefinition;
        }
        return service;
    }])
    /* jshint ignore:end */

})();
