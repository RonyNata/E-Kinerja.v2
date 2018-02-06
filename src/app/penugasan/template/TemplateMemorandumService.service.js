 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateMemorandumService',
    ['$state','MemorandumService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
    function ($state,MemorandumService, EkinerjaService, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
            var docDefinition = {
                pageSize: 'A4',
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
                        text: '' + data.unitKerjaPenandatangan.toUpperCase(), style: 'header'
                    },

                    {
                        text: 'REPUBLIK INDONESIA', style: 'header', margin: [0,0,0,15]
                    },
                    {
                        text: 'MEMORANDUM', style: 'nama_judul', size: 16
                    },

                    {
                        text: 'NOMOR '+ '' + data.nomorUrasan+ '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit + '/' + data.nomorTahun, style: 'judul_nomor'
                    },

                    {
                        style: 'demoTable', margin: [0,15,0,15],
                        table: {
                            widths: [50, 5, '*'],
                            body: [
                                [
                                    {text: 'Yth.', bold: true},
                                    {text: ':'},
                                    {text: ''+ data.gelarDepanPenerimaMemorandum + data.namaPenerimaMemorandum + data.gelarBelakangPenerimaMemorandum}
                                ],
                                [
                                    {text: 'Dari', bold: true},
                                    {text: ':'},
                                    {text: ''+ data.gelarDepanPemberiMemorandum + data.namaPemberiMemorandum + data.gelarBelakangPemberiMemorandum}
                                ],
                                [
                                    {text: 'Hal', bold: true},
                                    {text: ':'},
                                    {text: '' + data.hal}
                                ],
                                [
                                    {text: 'Tanggal', bold: true},
                                    {text: ':'},
                                    {text: ''+ EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis))}
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        margin:[0,0,0,20],
                        alignment:'justify',
                        text: '' + data.isiMemorandum
                    },

                    {
                        style: 'tandaTangan',
                        margin:[300,30,0,0],
                        table: {
                            widths: [200],
                            body: [
                                [{text: '' + data.jabatanPenandatangan.toUpperCase()+',', alignment : 'left', bold: true}],
                                [{text: ' ',margin: [0,20]}],
                                [{text: '' + data.gelarDepanPenandatangan + data.namaPenandatangan + data.gelarBelakangPenandatangan, alignment : 'left'}],
                                [{text: '' + data.pangkatPenandatangan, alignment : 'left'}],
                                [{text: 'NIP, ' + data.nipPenandatangan, alignment : 'left'}]
                            ]
                        },
                        layout: 'noBorders'
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
                        fontSize: 10,
                        alignment: 'center'
                    },
                    nama_judul: {
                        alignment : 'center',
                        bold: true,
                        fontSize: 16
                    },
                    judul_nomor: {
                        alignment : 'center',
                        fontSize: 12
                    },
                    header3: {
                        bold: true,
                        color: '#000',
                        fontSize: 10
                    },
                    tandaTangan: {
                        color: '#000',
                        fontSize: 12,
                        alignment:'right'
                    },
                    header1: {
                        bold: true,
                        fontSize: 15,
                        alignment: 'center'
                    }
                },

                images:{
                    pejabat: logo_garuda
                }
            };

            var tembusan = {
                ol:[]
            }

            for(var i = 0; i < data.tembusanMemorandumList.length; i++)
                tembusan.ol.push(data.tembusanMemorandumList[i].jabatan);
            docDefinition.content.push(tembusan);

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
                                    border: [false, false, false, false],
                                    text: 'Telp. (021) 89970696',
                                    fontSize: 9,
                                    alignment: 'right'
                                },{
                                border: [false, false, false, false],
                                text: 'Fax. (021) 89970064',
                                fontSize: 9,
                                alignment: 'center'
                            },{
                                border: [false, false, false, false],
                                text: 'email : diskominfo@bekasikab.go.id',
                                fontSize: 9,
                                alignment: 'left'
                            }
                            ]
                        ]
                    }
                };

                docDefinition.content[0] = {
                    margin: [175, -5, 0, 0],
                    table: {
                        widths: [230],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
                                    style: 'header2'
                                }
                            ]
                        ]
                    }
                };

                docDefinition.content.unshift({
                    margin: [90, -5, 0, 0],
                    table: {
                        widths: [400],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: 'DINAS KOMUNIKASI DAN INFORMATIKA PERSANDIAN DAN STATISTIK',
                                    style: 'header1'
                                }
                            ]
                        ]
                    }
                });

                docDefinition.content.unshift({
                    margin: [90, -96, 0, 0],
                    table: {
                        widths: [400],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: 'PEMERINTAHAN KABUPATEN BEKASI',
                                    style: 'header1'
                                }
                            ]
                        ]
                    }
                });

                docDefinition.content.unshift({
                    image: logo_bekasi,
                    width: 90,
                    height: 90
                });
            }
            return docDefinition;
        }
        return service;
    }])
    /* jshint ignore:end */

})();
