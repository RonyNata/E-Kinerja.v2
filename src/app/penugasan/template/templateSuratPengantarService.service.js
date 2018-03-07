 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratPengantarService',
    ['SuratPengantarService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
    function (SuratPengantarService, EkinerjaService, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
          var docDefinition = {
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
                                            {text: '' + data.unitKerjaPemberiSuratPengantar.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
                    margin: [0,15,0,0],
                    text: '' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis)),
                    alignment: 'right',
                    fontSize: 12
                },
                {
                    margin: [0, 10, 0, 0],
                    table: {
                        widths: [150],
                        body: [
                            [{text:[{text: 'Yth. ', fontSize: 12}, {text: '' + data.penerimaSuratPengantar.jabatan.toUpperCase(), fontSize: 12, bold:true}]}]
                        ]
                    },
                    layout: 'noBorders'
                },
                {
                    margin: [0,30,0,0],
                    text: 'SURAT PENGANTAR',
                    fontSize: 12,
                    alignment: 'center',
                    bold: true
                },
                {
                    margin: [0,0,0,0],
                    text: 'NOMOR : '+ data.nomorUrusan +'/' + data.nomorUrut + '/'+ data.nomorPasanganUrut + '/'+ data.nomorUnit + '/' + data.nomorTahun,
                    fontSize: 12,
                    alignment: 'center',
                    bold: true
                },
                {
                    margin: [0, 20, 0, 0],
                    table:{
                        widths: ['auto', 205, 130, 130],
                        body: [
                            [
                                {
                                    text: 'No.',
                                    fontSize: 12,
                                    alignment: 'center'
                                },
                                {
                                    text: 'Naskah Dinas yang Dikirimkan',
                                    fontSize: 12,
                                    alignment: 'center'
                                },
                                {
                                    text: 'Banyaknya',
                                    fontSize: 12,
                                    alignment: 'center'
                                },
                                {
                                    text: 'Keterangan',
                                    fontSize: 12,
                                    alignment: 'center'
                                }
                            ]
                        ]
                    }
                },


                {
                    margin: [0, 40, 0, 10],
                    table:{
                        widths: [100, 5, '*'],
                        body: [
                            [
                                {text: 'Di Terima Tanggal', fontSize: 12},
                                {text: ':', fontSize: 12},
                                {text: '' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalDiterimaSuratPengantar)), fontSize: 12}
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },


                {
                    margin: [0, 30, 0, 0],
                    columns: [
                        {
                            style: 'tandaTangan',
                            table: {
                                widths: ['*'],
                                body: [
                                    [{text: ['Penerima,'], alignment : 'left'}],
                                    [{text: '' + data.penerimaSuratPengantar.jabatan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + data.penerimaSuratPengantar.glrDpn + data.penerimaSuratPengantar.nama + data.penerimaSuratPengantar.glrBlk, alignment : 'left', bold: true}],
                                    [{text: '' + data.penerimaSuratPengantar.pangkat, alignment : 'left', bold: true}],
                                    [{text: 'NIP. ' + data.penerimaSuratPengantar.nip, alignment : 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            style: 'tandaTangan',
                            table: {
                                widths: ['*'],
                                body: [
                                    [{text: ['Pengirim,'], alignment : 'left'}],
                                    [{text: '' + data.jabatanPemberiSuratPengantar + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + data.gelarDepanPemberiSuratPengantar + data.namaPemberiSuratPengantar + data.gelarBelakangPemberiSuratPengantar, alignment : 'left', bold: true}],
                                    [{text: '' + data.pangkatPemberiSuratPengantar, alignment : 'left', bold: true}],
                                    [{text: 'NIP. ' + data.nipPemberiSuratPengantar, alignment : 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]
                },

                {
                    margin: [0, 30, 0, 0],
                    table:{
                        widths: [100, 5, '*'],
                        body: [
                            [
                                {text: 'No. Telephone', fontSize: 12},
                                {text: ':', fontSize: 12},
                                {text: '' + data.nomorTeleponPemberi, fontSize: 12}
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
          for(var i = 0; i < data.suratPengantarIsiWrapperList.length; i++)
            docDefinition.content[5].table.body.push([
                      {
                          text: '' + (i+1),
                          fontSize: 12,
                          alignment: 'center'
                      },
                      {
                          text: '' + data.suratPengantarIsiWrapperList[i].naskahDinasYangDikirim,
                          fontSize: 12
                      },
                      {
                          text: '' + data.suratPengantarIsiWrapperList[i].banyakNaskah,
                          fontSize: 12,
                          alignment: 'center'
                      },
                      {
                          text: '' + data.suratPengantarIsiWrapperList[i].keterangan,
                          fontSize: 12,
                          alignment: 'center'
                      }
                    ]);

            return docDefinition;
        };
 
        return service;
    }])
    /* jshint ignore:end */

})();
