 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('TemplateSuratKeputusanService',
    ['SuratKeputusanService', 'EkinerjaService', 'logo_bekasi', 'logo_garuda',
    function (SuratKeputusanService, EkinerjaService, logo_bekasi, logo_garuda) {
        var service = {}; 

        service.template = function(data){
          var docDefinition = {
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
                                    border: [false, false, false, false],
                                    text: 'PEMERINTAHAN KABUPATEN BEKASI',
                                    style: 'header'
                                }
                            ]
                        ]
                    }
                },
                {
                    margin: [90, -5, 0, 0],
                    table: {
                        widths: [400],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: '' + data.unitKerjaPenandatangan.toUpperCase(),
                                    style: 'header'
                                }
                            ]
                        ]
                    }
                },
                {
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
                },
                {
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
                    text: 'KEPUTUSAN ' + data.jabatanPenandatangan.toUpperCase() + '\n' + data.unitKerjaPenandatangan.toUpperCase()
                    +'\n' +
                    'Selaku\n' + data.selaku.toUpperCase() + '\n', style: 'nama_judul'
                },
                {
                    text: 'NOMOR '+ data.nomorUrut +' TAHUN ' + data.nomorTahun, style: 'judul_nomor', margin: [0,15,0,15]
                },

                {
                    text: 'TENTANG', style: 'nama_judul'
                },
                {
                    text: '' + data.tentang.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                },

                {
                    text: '' + data.jabatanPenandatangan.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Menimbang', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                                { border: [false, false, false, false], type: 'lower-alpha',
                                    ol: [ data.menimbang
                                        
                                    ]
                                }
                            ],
                            [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}],
                            [{text: 'Mengingat', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                                {   border: [false, false, false, false],
                                    ol: [
                                        data.mengingat
                                    ]
                                }
                            ]
                        ]
                    }
                },

                {
                    text: 'MEMUTUSKAN', alignment: 'center', fontSize: 12, bold:true
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Menetapkan', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]}, {text:['KEPUTUSAN ','' + data.jabatanPenandatangan + ' ' + data.unitKerjaPenandatangan.toUpperCase(), ' TENTANG ', '' + data.tentang.toUpperCase()], border: [false, false, false, false]}
                            ]
                        ]
                    }
                },

                {
                    style: 'tandaTangan',
                    table: {
                        widths: [200],
                        body: [
                            [{text: ['Ditetapkan di ', {text:'' + data.kotaPembuatanSurat, bold:true}], alignment : 'left', border: [false, false, false, false]}],
                            [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis)), bold:true}], alignment : 'left', border: [false, false, false, false]}],
                            [{text: '' + data.jabatanPenandatangan.toUpperCase() + ', ', alignment : 'left', bold: true, border: [false, false, false, false]}],
                            [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                            [{text: '' + data.namaPenandatangan.toUpperCase(), alignment : 'left', border: [false, false, false, false]}]
                        ]
                    }
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
                header3: {
                    bold: true,
                    color: '#000',
                    fontSize: 10
                },
                demoTable: {
                    color: '#000',
                    fontSize: 10
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

          for(var i = 0; i < data.menetapkan.length; i++){
            var style = [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}];
            var body = [{text: '' + SuratKeputusanService.FindUrutan(i), 
                        style: 'header3', border: [false, false, false, false]},
                        {text: ':', border: [false, false, false, false]}, 
                        {text: '' + data.menetapkan[i], border: [false, false, false, false]}];
            docDefinition.content[13].table.body.push(style);
            docDefinition.content[13].table.body.push(body);
          }
          return docDefinition;
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
