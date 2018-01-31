(function(){
    'use strict';
    angular
        .module('eKinerja')
        .factory('TemplateSuratTugasService',
            ['SuratTugasService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
                function (SuratTugasService, EkinerjaService, logo_bekasi, logo_garuda) {
                    var service = {};

                    service.template = function (data){
                        var docDefinition = {
                            pageSize: 'A4',
                            content: [
                                {
                                    image: logo_bekasi,
                                    width: 90,
                                    height: 90
                                },

                                {
                                    margin: [90, -96, 0, 0],
                                    table: {
                                        widths: [400],
                                        body: [
                                            [
                                                {
                                                    text: 'PEMERINTAHAN KABUPATEN BEKASI',
                                                    style: 'header1'
                                                }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    margin: [90, -5, 0, 0],
                                    table: {
                                        widths: [400],
                                        body: [
                                            [
                                                {
                                                    text: '' + data.unitKerjaPenandatangan,
                                                    style: 'header1'
                                                }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    margin: [175, -5, 0, 0],
                                    table: {
                                        widths: [230],
                                        body: [
                                            [
                                                {
                                                    text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
                                                    style: 'header2'
                                                }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    margin: [115, -5, 0, 0],
                                    table: {
                                        widths: [90, 90, 150],
                                        body: [
                                            [
                                                {
                                                    text: 'Telp. (021) 89970696',
                                                    fontSize: 9,
                                                    alignment: 'right'
                                                },{
                                                text: 'Fax. (021) 89970064',
                                                fontSize: 9,
                                                alignment: 'center'
                                            },{
                                                text: 'email : diskominfo@bekasikab.go.id',
                                                fontSize: 9,
                                                alignment: 'left'
                                            }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    margin: [0, 10, 0, 15],
                                    table: {
                                        widths: ['*'],
                                        body: [
                                            [
                                                {
                                                }
                                            ]
                                        ]
                                    },
                                    layout: {
                                        fillColor: 'Black'
                                    }
                                },

                                {
                                    text: 'SURAT TUGAS', style: 'nama_judul'
                                },

                                {
                                    text: 'NOMOR ' + data.nomorUrusan+ '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit + '/'+ data.nomorTahun, style: 'judul_nomor'
                                },

                                {
                                    style: 'demoTable', margin: [0,15,0,0],
                                    table: {
                                        widths: [50, 5, '*'],
                                        body: [
                                            [{text: 'Nama', bold: true},{text: ':'},{text: '' + data.nipPenandatangan.nama}],
                                            [{text: 'Jabatan', bold: true},{text: ':'},{text: '' + data.nipPenandatangan.jabatan}]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    style: 'demoTable', margin: [0,15,0,10],
                                    table: {
                                        widths: [80, 5, '*'],
                                        body: [
                                            [{text: 'Menimbang', style: 'header'},{text: ':'},
                                                {
                                                    ol: [
                                                    ]
                                                }
                                            ],
                                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                                            [{text: 'Dasar', style: 'header'},{text: ':'},
                                                {
                                                    ol: [data.dasarList]
                                                }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    text: 'Memberi Tugas', alignment: 'center', fontSize: 11
                                },

                                {
                                    style: 'demoTable', margin: [0,10,0,15],
                                    table: {
                                        widths: [80, 5, '*'],
                                        body: [
                                            [{text: 'Kepada', style: 'header'},{text: ':'},

                                                {
                                                    ol: []
                                                }],
                                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                                            [{text: 'Untuk', style: 'header'},{text: ':'},
                                                {
                                                    ol : [data.untukList]
                                                }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    style: 'tandaTangan',
                                    table: {
                                        widths: [250],
                                        body: [
                                            [{text: '' + data.tempat + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalTugasMilis)), alignment : 'left'}],
                                            [{text: ''+ data.nipPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                            [{text: ' ',margin: [0,20]}],
                                            [{text: '' + data.nipPenandatangan.nama, alignment : 'left'}]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {text: 'Tembusan :'}

                            ],

                            styles: {
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
                                header: {
                                    bold: true,
                                    color: '#000',
                                    fontSize: 10
                                },
                                header1: {
                                    bold: true,
                                    fontSize: 15,
                                    alignment: 'center'
                                },
                                header2: {
                                    fontSize: 10,
                                    alignment: 'center'
                                },
                                demoTable: {
                                    color: '#000',
                                    fontSize: 10
                                },
                                tandaTangan: {
                                    color: '#000',
                                    fontSize: 10,
                                    alignment : 'right',
                                    margin: [300,0,0,20]
                                }
                            }
                        };

                        for(var i = 0; i < vm.target.length; i++){
                            var data = {
                                widths: ['*', '*', '*'],
                                table: {
                                    body: [
                                        [{text: 'Nama', bold: true}, {text: ':'}, {text: '' + data.targetSuratTugasPegawaiSet[i].nama}],
                                        [{text: 'NIP', bold: true}, {text: ':'}, {text: '' + data.targetSuratTugasPegawaiSet[i].nip}],
                                        [{text: 'Pangkat/Gol. Ruang', bold: true}, {text: ':'}, {text: '' + data.targetSuratTugasPegawaiSet[i].gol}],
                                        [{text: 'Jabatan', bold: true}, {text: ':'}, {text: '' + data.targetSuratTugasPegawaiSet[i].jabatan}]
                                    ]
                                },
                                layout: 'noBorders'
                            };
                            docDefinition.content[8].table.body[0][2].ol.push(data);
                        }

                        var tembusan = {
                            ol:[]
                        };

                        for(var i = 0; i < data.tembusanSuratTugasSet.length; i++)
                            tembusan.ol.push(data.tembusanSuratTugasSet[i].jabatan);
                        docDefinition.content.push(tembusan);

                        return docDefinition;
                    };

                    return service;
                }])
    /* jshint ignore:end */

})();
