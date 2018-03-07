 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratUndanganService',
    ['$state', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
    function ($state, EkinerjaService, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
            var docDefinition = {
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
                        table: {
                            widths: [60, 3, 200, '*'],
                            body: [
                                [
                                    {text: 'Nomor', fontSize: 12},
                                    {text: ':', fontSize: 12},
                                    {text: '' + data.nomorUrusan + '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit + '/' + data.nomorTahun, fontSize: 12},
                                    {text: '' + data.kotaPembuatanSurat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanSurat)), alignment: 'right',fontSize: 12}
                                ],
                                [
                                    {text: 'Sifat', fontSize: 12},
                                    {text: ':', fontSize: 12},
                                    {text: '' + data.sifat, fontSize: 12},
                                    {text: ''}
                                ],
                                [
                                    {text: 'Hal', fontSize: 12},
                                    {text: ':', fontSize: 12},
                                    {text: '' + data.hal, fontSize: 12},
                                    {text: ''}
                                ],
                                [
                                    {text: 'Lampiran', fontSize: 12},
                                    {text: ':', fontSize: 12},
                                    {text: '' + data.lampiran + ' Halaman', fontSize: 12},
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
                                {text: 'Yth. '+''+ data.namaPenerimaSuratUndangan,rowSpan: 3, fontSize: 12}
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [0, 20, 0, 0],
                        table: {
                            width: [400],
                            body: [
                                [{text: ''+ data.bagianPembukaSuratUndangan, fontSize: 12}],
                                [
                                    {
                                        margin: [50, 0, 0 ,0],
                                        table: {
                                            widths: [107, 2, 300],
                                            body: [
                                                [
                                                    {text: 'tanggal', fontSize: 12},
                                                    {text: ':', fontSize: 12},
                                                    {text: ''+ data.bagianIsiHariSuratUndangan + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.bagianIsiTanggalSuratUndangan)), fontSize: 12}
                                                ],
                                                [
                                                    {text: 'waktu', fontSize: 12},
                                                    {text: ':', fontSize: 12},
                                                    {text: ''+ data.bagianIsiWaktuSuratUndangan, fontSize: 12}
                                                ],
                                                [
                                                    {text: 'tempat', fontSize: 12},
                                                    {text: ':', fontSize: 12},
                                                    {text: ''+ data.bagianIsiTempatSuratUndangan, fontSize: 12}
                                                ],
                                                [
                                                    {text: 'acara', fontSize: 12},
                                                    {text: ':', fontSize: 12},
                                                    {text: ''+ data.bagianIsiAcaraSuratUndangan, fontSize: 12}
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders'
                                    }
                                ],
                                [{text: ''+ data.bagianPenutupSuratUndangan, fontSize: 12}]
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
                                        [{text: '' + data.jabatanPenandatangan + ',', alignment : 'left', bold: true}],
                                        [{text: ' ',margin: [0,20]}],
                                        [{text: '' + data.gelarDepanPenandatangan + data.namaPenandatangan + data.gelarBelakangPenandatangan, alignment : 'left', bold:true}],
                                        [{text: '' + data.pangkatPenandatangan, alignment : 'left', bold:true}],
                                        [{text: '' + data.nipPenandatangan, alignment : 'left'}]
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
                },
                footer: function(currentPage, pageCount) { var foot =  
                    {
                        margin: 10,
                        columns: [{text: currentPage.toString() + ' of ' + pageCount}]
                    }
                    if(data.barcodeImage != null)
                        foot.columns.push({
                            image: 'data:image/jpeg;base64,' + data.barcodeImage,
                            width: 200
                        })
                    return foot;
                }
            };

            var tembusan = {
                ol:[]
            };

            for(var i = 0; i < data.tembusanSuratUndanganList.length; i++)
                tembusan.ol.push(data.tembusanSuratUndanganList[i].jabatan);
            docDefinition.content.push(tembusan);

            if(!data.isSuratPejabat){
                docDefinition.content[0] =
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
                    };

                docDefinition.content[1] = {};
                docDefinition.content[2] = {};
            }
            return docDefinition;
        };
 
        return service;
    }])
    /* jshint ignore:end */

})();
