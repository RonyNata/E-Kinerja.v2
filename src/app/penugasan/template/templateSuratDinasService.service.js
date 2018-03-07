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
                                        widths: [60, 5, '*', '*'],
                                        body: [
                                            [{text: 'Nomor', bold: true},{text: ':'},{text: ''+ data.nomorUrusan + '/' + data.nomorUrut + '/' + data.nomorPasanganUrut + '/' + data.nomorUnit + '/' + data.nomorTahun}, {text: '' + data.kotaPembuatanSurat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(new Date(data.tanggalPembuatanMilis)), alignment:'right'}],
                                            [{text: 'Sifat', bold: true},{text: ':'},{text: '' + data.sifat}, {text: ''}],
                                            [{text: 'Lampiran', bold: true},{text: ':'},{text: '' + data.lampiran}, {text: ''}],
                                            [{text: 'Hal', bold: true},{text: ':'},{text: '' + data.hal}, {text: ''}]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    margin: [0,0,0,15],
                                    table: {
                                        widths: [200],
                                        body: [
                                            [{text: 'Yth. ' + data.jabatanPenerimaSuratDinas}]
                                        ]
                                    },
                                    layout: 'noBorders'
                                },

                                {
                                    text: '' + data.isiSuratDinas,  margin: [0,0,0,10], alignment:'justify'
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
