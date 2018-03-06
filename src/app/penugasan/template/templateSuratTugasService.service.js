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
                                                            {text: '' + data.unitKerjaPenandatangan.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                                            [{text: 'Nama', bold: true},{text: ':'},{text: '' + data.nipPenandatangan.glrDpn + data.nipPenandatangan.nama + data.nipPenandatangan.glrBlk}],
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
                                            [{text: 'Menimbang', fontSize: 12, bold:true},{text: ':'},
                                                {
                                                    ol: []
                                                }
                                            ],
                                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                                            [{text: 'Dasar', fontSize: 12, bold:true},{text: ':'},
                                                {
                                                    ol: []
                                                }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    text: 'Memberi Tugas', alignment: 'center', fontSize: 12
                                },

                                {
                                    style: 'demoTable', margin: [0,10,0,15],
                                    table: {
                                        widths: [80, 5, '*'],
                                        body: [
                                            [{text: 'Kepada', fontSize: 12, bold:true},{text: ':'},
                                                {
                                                    ol: []
                                                }],
                                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                                            [{text: 'Untuk', fontSize: 12, bold:true},{text: ':'},
                                                {
                                                    ol : []
                                                }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
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
                                                    [{text: '' + data.tempat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalTugasMilis)), alignment : 'left'}],
                                                    [{text: '' + data.nipPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                                    [{text: ' ',margin: [0,20]}],
                                                    [{text: '' + data.nipPenandatangan.glrDpn + data.nipPenandatangan.nama + data.nipPenandatangan.glrBlk, alignment : 'left', bold: true}],
                                                    [{text: '' + data.nipPenandatangan.pangkat, alignment : 'left', bold: true}],
                                                    [{text: 'NIP. ' + data.nipPenandatangan.nip, alignment : 'left'}]
                                                ]
                                            },
                                            layout: 'noBorders'
                                        }
                                    ]
                                },

                                {text: 'Tembusan :'}

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
                            }
                        };

                        for(var i = 0; i < data.targetSuratTugasPegawaiSet.length; i++){
                            var dat = {
                                widths: ['*', '*', '*'],
                                table: {
                                    body: [
                                        [{text: 'Nama', bold: true}, {text: ':'}, {text: '' + data.targetSuratTugasPegawaiSet[i].glrDpn + data.targetSuratTugasPegawaiSet[i].nama + data.targetSuratTugasPegawaiSet[i].glrBlk}],
                                        [{text: 'NIP', bold: true}, {text: ':'}, {text: '' + data.targetSuratTugasPegawaiSet[i].nip}],
                                        [{text: 'Pangkat/Gol. Ruang', bold: true}, {text: ':'}, {text: '' + data.targetSuratTugasPegawaiSet[i].pangkat + ' - ' + data.targetSuratTugasPegawaiSet[i].gol}],
                                        [{text: 'Jabatan', bold: true}, {text: ':'}, {text: '' + data.targetSuratTugasPegawaiSet[i].jabatan}]
                                    ]
                                },
                                layout: 'noBorders'
                            };
                            docDefinition.content[6].table.body[0][2].ol.push(dat);
                        }

                        var tembusan = {
                            ol:[]
                        };

                        for(var i = 0; i < data.tembusanSuratTugasSet.length; i++)
                            tembusan.ol.push(data.tembusanSuratTugasSet[i].jabatan);
                        docDefinition.content.push(tembusan);

                        for(var i = 0; i < data.menimbangList.length; i++)
                            docDefinition.content[4].table.body[0][2].ol.push(data.menimbangList[i]);

                        for(var i = 0; i < data.dasarList.length; i++)
                            docDefinition.content[4].table.body[2][2].ol.push(data.dasarList[i]);

                        for(var i = 0; i < data.untukList.length; i++)
                            docDefinition.content[6].table.body[2][2].ol.push(data.untukList[i]);

                        if(data.barcodeImage != null)
                            docDefinition.footer = {
                                margin: 10,
                                columns: [{},
                                    {
                                        image: 'data:image/jpeg;base64,' + data.barcodeImage,
                                        width: 200
                                    }
                                ]
                            };
                        return docDefinition;
                    };

                    return service;
                }])
    /* jshint ignore:end */

})();
