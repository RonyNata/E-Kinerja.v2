 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratKeteranganService',
    ['SuratKeteranganService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
    function (SuratKeteranganService, EkinerjaService,logo_bekasi, logo_garuda) {
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
                                                {text: '' + data.unitKerjaPenandatangan.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                        text: [{text : 'NOMOR : ', style: 'judul_nomor'}, '' + data.nomorUrusan + '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit + '/' + data.nomorTahun]
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
                                        text: 'Nama',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + data.gelarDepanPenandatangan + data.namaPenandatangan + data.gelarBelakangPenandatangan,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'NIP',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + data.nipPenandatangan,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Jabatan',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + data.jabatanPenandatangan,
                                        fontSize: 12
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
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
                                        text: 'Nama',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ data.nipPegawaiKeteranganList[0].glrDpn + data.nipPegawaiKeteranganList[0].nama + data.nipPegawaiKeteranganList[0].glrBlk,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'NIP',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ data.nipPegawaiKeteranganList[0].nip,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Pangkat/Golongan',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + data.nipPegawaiKeteranganList[0].pangkat + '/' + data.nipPegawaiKeteranganList[0].gol,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Jabatan',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ data.nipPegawaiKeteranganList[0].jabatan,
                                        fontSize: 12
                                    }
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
                                    {
                                        text: '' + data.isiSuratKeterangan,
                                        fontSize: 12
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [330,30,0,0],
                        table: {
                            widths: [40, 120],
                            body: [
                                [
                                    {
                                        alignment: 'left',
                                        text: '' + data.kotaPembuatanSurat+', '
                                    },
                                    {
                                        alignment: 'left',
                                        text: '' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanSuratMilis))
                                    }
                                ],
                                [
                                    {
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + data.jabatanPenandatangan
                                    }
                                ],
                                [
                                    {
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'tanda tangan\n\n'
                                    }
                                ],
                                [
                                    {
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + data.gelarDepanPenandatangan + data.namaPenandatangan + data.gelarBelakangPenandatangan,
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + data.pangkatPenandatangan,
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'NIP. ' + data.nipPenandatangan,
                                    }
                                ]
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
                    }
                },

                images:{
                    logo: logo_bekasi
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
                }

                return docDefinition;
            }
        return service;
    }])
    /* jshint ignore:end */

})();
