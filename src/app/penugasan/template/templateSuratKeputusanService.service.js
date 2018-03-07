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
                            [{text: 'Menimbang', fontSize: 12, bold:true},{text: ':'},
                                {
                                    type: 'lower-alpha',
                                    ol: []
                                }
                            ],
                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                            [{text: 'Mengingat', fontSize: 12, bold:true},{text: ':'},
                                {
                                    ol: []
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },

                {
                    text: 'MEMUTUSKAN', alignment: 'center', fontSize: 12, bold:true
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [
                                {text: 'Menetapkan', fontSize: 12, bold:true},{text: ':'},
                                {text:['KEPUTUSAN ','' + data.jabatanPenandatangan + ' ' + data.unitKerjaPenandatangan.toUpperCase(), ' TENTANG ', '' + data.tentang.toUpperCase()]}
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
                                    [{text: ['Ditetapkan di ', {text:'' + data.kotaPembuatanSurat.toUpperCase(), bold:true}], alignment : 'left'}],
                                    [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis)), bold:true}], alignment : 'left'}],
                                    [{text: '' + data.jabatanPenandatangan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + data.gelarDepanPenandatangan + data.namaPenandatangan + data.gelarBelakangPenandatangan, alignment : 'left', bold:true}],
                                    [{text: '' + data.pangkatPenandatangan, alignment : 'left', bold:true}],
                                    [{text: 'NIP. ' + data.nipPenandatangan, alignment : 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]
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

          for(var i = 0; i < data.menetapkan.length; i++){
            var style = [{text: '',margin: [0,0,0,3], colSpan: 3}];
            var body = [{text: '' + SuratKeputusanService.FindUrutan(i),fontSize: 12, bold:true},
                        {text: ':'},
                        {text: '' + data.menetapkan[i],fontSize: 12}];
            docDefinition.content[8].table.body.push(style);
            docDefinition.content[8].table.body.push(body);
          }

            for(var i = 0; i < data.menimbang.length; i++)
                docDefinition.content[6].table.body[0][2].ol.push(data.menimbang[i]);

            for(var i = 0; i < data.mengingat.length; i++)
                docDefinition.content[6].table.body[2][2].ol.push(data.mengingat[i]);

            return docDefinition;
        };
 
        return service;
    }])
    /* jshint ignore:end */

})();
