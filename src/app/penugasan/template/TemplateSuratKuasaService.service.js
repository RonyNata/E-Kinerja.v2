 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratKuasaService',
    ['SuratKuasaService','EkinerjaService', 'logo_bekasi', 'logo_garuda',
    function (SuratKuasaService, EkinerjaService,logo_bekasi, logo_garuda) {
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
                                                {text: '' + data.unitKerjaPemberiKuasa.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                        text: [{text : 'NOMOR : ', style: 'judul_nomor'}, '' + data.nomorUrusan + '/' + data.nomorUrut + '/' + data.nomorPasanganUrut+ '/' + data.nomorUnit + '/' + data.nomorTahun]
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
                                    {text: '' + data.gelarDepanPemberiKuasa + data.namaPemberiKuasa + data.gelarBelakangPemberiKuasa, fontSize: 10}
                                ],
                                [
                                    {text: 'NIP', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: '' + data.nipPemberiKuasa, fontSize: 10}
                                ],
                                [
                                    {text: 'Jabatan', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: '' + data.jabatanPemberiKuasa, fontSize: 10}
                                ],
                                [
                                    {text: 'Alamat', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    // {text: '' + data.alamatPemberiKuasa, fontSize: 10}
                                    {text: '' + data.alamatRumahPemberiKuasa, fontSize: 10}
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
                                    {text: ''+ data.gelarDepanPenerimaKuasa + data.namaPenerimaKuasa + data.gelarBelakangPenerimaKuasa, fontSize: 10}
                                ],
                                [
                                    {text: 'NIP', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: ''+ data.nipPenerimaKuasa, fontSize: 10}
                                ],
                                [
                                    {text: 'Jabatan', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    {text: ''+ data.jabatanPenerimaKuasa, fontSize: 10}
                                ],
                                [
                                    {text: 'Alamat', fontSize: 10},
                                    {text: ':', fontSize: 10},
                                    // {text: '' + data.alamatPenerimaKuasa, fontSize: 10}
                                    {text: '' + data.alamatRumahPenerimaKuasa, fontSize: 10}
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
                                    {text: '' + data.isiKuasa, fontSize: 10}
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
                                        {text:'' + data.kotaPembuatanSurat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis))}
                                    ]
                                }],
                                [{text: 'Penerima Kuasa,', bold: true, alignment: 'center'},{},{text: 'Pemberi Kuasa,', bold: true, alignment: 'center'}],
                                [{text: ' ',margin: [0,15]},{},{text: ' ',margin: [0,15]}],
                                [{text: ''+ data.gelarDepanPenerimaKuasa + data.namaPenerimaKuasa + data.gelarBelakangPenerimaKuasa, alignment: 'center'}, {}, {text: ''+ data.gelarDepanPemberiKuasa + data.namaPemberiKuasa + data.gelarBelakangPemberiKuasa, alignment: 'center'}],
                                [{text: ''+ data.pangkatPenerimaKuasa, alignment: 'center'}, {}, {text: ''+ data.pangkatPemberiKuasa, alignment: 'center'}],
                                [{text: ''+ data.nipPenerimaKuasa, alignment: 'center'}, {}, {text: ''+ data.nipPemberiKuasa, alignment: 'center'}]
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
            return docDefinition;
        }
        return service;
    }])
    /* jshint ignore:end */

})();
