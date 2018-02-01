(function(){
    'use strict';
    angular
        .module('eKinerja')
        .factory('TemplateSuratDinasService',
            ['SuratDinasService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
                function (SuratDinasService, EkinerjaService, logo_bekasi, logo_garuda) {
                    var service = {};

                    service.template = function (data){
                        var docDefinition = {
                            content: [
                                {
                                    image: logo_garuda,
                                    width: 50,
                                    height: 50,
                                    alignment: 'center',
                                    margin: [0,0,0,5]
                                },

                                {
                                    text: '' + data.jabatanPenandatangan.toUpperCase(), style: 'nama_judul'
                                },

                                {
                                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,20]
                                },

                                {
                                    style: 'demoTable', margin: [0,0,0,15],
                                    table: {
                                        widths: [50, 5, '*', '*'],
                                        body: [
                                            [{text: 'Nomor', bold: true},{text: ':'},{text: ''+ data.nomorUrusan + '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit + '/' + data.nomorTahun}, {text: '' + data.kotaPembuatanSurat + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis)), alignment:'right'}],
                                            [{text: 'Sifat', bold: true},{text: ':'},{text: '' + data.sifat}, {text: ''}],
                                            [{text: 'Lampiran', bold: true},{text: ':'},{text: '' + data.lampiran}, {text: ''}],
                                            [{text: 'Hal', bold: true},{text: ':'},{text: '' + data.hal}, {text: ''}]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    margin: [0,0,0,15], alignment:'justifly',
                                    table: {
                                        widths: [150],
                                        body: [
                                            [{text: 'Yth. ' + data.jabatanPenerimaSuratDinas}]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    text: '' + data.isiSuratDinas,  margin: [0,0,0,10], alignment:'justifly'
                                },

                                {
                                    style: 'tandaTangan',
                                    table: {
                                        widths: [200],
                                        body: [
                                            [{text: '' + data.jabatanPenandatangan + ',', alignment : 'left', bold: true}],
                                            [{text: ' ',margin: [0,20]}],
                                            [{text: '' + data.namaPenandatangan, alignment : 'left'}],
                                            [{text: '' + data.nipPenandatangan, alignment : 'left'}]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {text: 'Tembusan :'}
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
                                header1: {
                                    bold: true,
                                    fontSize: 15,
                                    alignment: 'center'
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
                                    fontSize: 10,
                                    alignment:'right'
                                }
                            }
                        };

                        if(!data.isSuratPejabat){
                            docDefinition.content[2] = {
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
                            };

                            docDefinition.content[1] = {
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
                            };

                            docDefinition.content[0] = {
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
                            };

                            docDefinition.content.unshift({
                                margin: [90, -5, 0, 0],
                                table: {
                                    widths: [400],
                                    body: [
                                        [
                                            {
                                                text: '' + data.unitKerjaPenandatangan.toUpperCase(),
                                                style: 'header1'
                                            }
                                        ]
                                    ]
                                },
                                layout: 'noBorders'
                            });

                            docDefinition.content.unshift({
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
                            });

                            docDefinition.content.unshift({
                                image: logo_bekasi,
                                width: 90,
                                height: 90
                            });
                        }
                        var tembusan = {
                            ol:[]
                        };

                        for(var i = 0; i < data.tembusanSuratDinasWrapper.length; i++)
                            tembusan.ol.push(data.tembusanSuratDinasWrapper[i].jabatan);
                        docDefinition.content.push(tembusan);

                        return docDefinition;
                    };

                    return service;
                }])
})();
